<?php

namespace App\Controllers;

use App\Models\Invoices;
use App\Config\Database; 
use App\Core\Controller;

class InvoicesController
{

    private $db;

    public function __construct(Database $db)
    {
        // Initialize Database object in constructor
        $this->db = $db->connect(); 
    }

    public function getAllInvoices() 
    {
        try {
            // Query per ottenere tutte le fatture con le informazioni dell'azienda
            $query = "
                SELECT  invoices.id, 
                        invoices.ref    AS reference,
                        invoices.company_id, 
                        companies.name  AS companyName, 
                        invoices.due_date, 
                        invoices.created_at, 
                        invoices.updated_at 
                FROM    invoices 
                LEFT JOIN companies ON invoices.company_id = companies.id
            ";

            $stmt = $this->db->query($query);

            if ($stmt === false) {
                throw new \Exception('Query execution failed');
            }

            $invoicesData = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            if ($invoicesData === false) {
                throw new \Exception('Failed to fetch invoices data');
            }

            // Load invoice data using model
            $invoices = Invoices::loadData($invoicesData);

            // Return data encoded in JSON
            $response = [
                "status" => 200,
                "message" => 'OK',
                "data" => $invoices
            ];

        } catch (\Exception $e) {
            // Handle exceptions and prepare error response
            $response = [
                "status" => 500,
                "message" => "ERROR INTERNAL SERVER: " . $e->getMessage(),
                "data" => null
            ];
        }

        // Set the response header to indicate JSON content
        header('Content-Type: application/json');
        
        // Send the JSON response
        echo json_encode($response);
    }

    public function createInvoice() 
    {
        // Extract and sanitize data from request body
        $params = Invoices::dataBodyInsert(); 

        $query = "INSERT INTO invoices (ref, company_id, due_date, created_at, updated_at) 
                  VALUES (:ref, :company_id, :due_date, :created_at, :updated_at)"; 
        $stmt = $this->db->prepare($query);
        // Execute SQL query with parameters
        $stmt->execute($params); 
        // Return success message
        echo json_encode(["message" => "Invoice created successfully"]); 
    }

    //doesn't work like I would like
    public function updateInvoice($id) 
    {
        $params = Invoices::dataBodyUpdate($id); // Extract and sanitize data from request body for update

        $query = "
            UPDATE  invoices 
            SET     {$params['paramsSet']} 
            WHERE   id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->execute($params['paramsBody']); // Execute SQL query with parameters

        echo json_encode(["message" => "Invoice updated successfully"]); // Return success message
    }

    public function deleteInvoice($id) {
        $query = "DELETE FROM invoices WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute(); // Execute SQL delete query

        echo json_encode(["message" => "Invoice deleted successfully"]); // Return success message
    }

    public function getInvoice($id) {
        $query = "SELECT * FROM invoices WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        $invoiceData = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$invoiceData) {
            echo json_encode(["error" => "Invoice not found"]); // Return error if company not found
            return;
        }

        $invoice = new Invoices(
            $invoiceData['id'],
            $invoiceData['ref'],
            $invoiceData['company_id'],
            $invoiceData['companyName'],
            $invoiceData['due_date'],
            $invoiceData['created_at'],
            $invoiceData['updated_at']
        );

        echo json_encode($invoice); // Return invoice data encoded in JSON
    }
    // public function index()
    // {
    //     require(__DIR__ . '/../views/invoices.php');
    // }
}

?>