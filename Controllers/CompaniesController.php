<?php

namespace App\Controllers;

use App\Models\Companies;
use App\Config\Database; 
use App\Core\Controller;

class CompaniesController {

    private $db;

    public function __construct(Database $db) {
        // Initialize Database object in constructor
        $this->db = $db->connect(); 
    }

    public function getAllCompanies() {

        try{
            $query = "SELECT companies.id, companies.name, companies.type_id, companies.country, companies.tva, DATE_FORMAT(companies.created_at, '%d/%m/%Y') as created_at, DATE_FORMAT(companies.updated_at, '%d/%m/%Y') as updated_at, types.name as type FROM companies LEFT JOIN types ON companies.type_id = types.id ORDER BY companies.created_at DESC";
            $stmt = $this->db->query($query);
            $companiesData = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // Load company data using model
            $companies = Companies::loadData($companiesData);

            // Return data encoded in JSON with status
            $response = [
                'status' => 200,
                'message' => 'OK',
                'data' => $companies
            ];
        } catch (\Exception $e) {
            // Handle exceptions and return an error status
            $response = [
                'status' => 500,
                'message' => 'Internal Server Error: ' . $e->getMessage(),
                'data' => []
            ];
        }

        // Set the response header to indicate JSON content
        header('Content-Type: application/json');
        echo json_encode($response);
    }



    public function createCompany() {


           // check the users is logged
    if (!isset($_SESSION['user'])) {
        header('HTTP/1.1 401 Unauthorized');
        echo json_encode(["error" => "User not authenticated"]);
        exit(); 
    }
        //verify the users'role
        if ($_SESSION['user']['role'] !== 'admin' && $_SESSION['user']['role'] !== 'moderator') {
            header('HTTP/1.1 403 Forbidden');
            echo json_encode(["error" => "Access denied"]);
            exit(); 
        }
        try {
        // Extract and sanitize data from the request body
        $params = Companies::dataBodyInsert();
    
        // SQL query for entering a new company
        $query = "INSERT INTO companies (name, type_id, country, tva, created_at, updated_at)
                  VALUES (:name, (SELECT id FROM types WHERE name LIKE :type), :country, :tva, :created_at, :updated_at)";
    
        // Prepare stmt 
        $stmt = $this->db->prepare($query);
    
        // execute the query 
        $stmt->execute($params);

        
    
        $response = [
            'status' => 201,
            'message' => 'Company Created successfully',
            'params' => $params
        ];

        echo createJson($response);
    } catch (\Throwable $th) {
        $response = [
            'status' => 500,
            'message' => 'Bad Request',
            'error' => $th->getMessage()
        ];

        echo createJson($response);
    }
}

    
    
public function updateCompany($id) {
           // check the users is logged
           if (!isset($_SESSION['user'])) {
            header('HTTP/1.1 401 Unauthorized');
            echo json_encode(["error" => "User not authenticated"]);
            exit(); 
        }
            //verify the users'role
            if ($_SESSION['user']['role'] !== 'admin') {
                header('HTTP/1.1 403 Forbidden');
                echo json_encode(["error" => "Access denied"]);
                exit(); 
            }
    try {
        // Extract and sanitize data from request body for update
        $params = Companies::dataBodyUpdate($id);

        // Prepare SQL query for update
        $query = "UPDATE companies SET {$params['paramsSet']} WHERE id = :id";
        $stmt = $this->db->prepare($query);

        // Bind the ID parameter
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);

        // Execute SQL query with parameters
        $stmt->execute($params['paramsBody']);

        // Check if any row was affected
        if ($stmt->rowCount() > 0) {
            $response = [
                'status' => 202,
                'message' => 'OK',
                'params' => $params['paramsBody']
            ];
        } else {
            $response = [
                'status' => 404,
                'message' => 'Company not found',
            ];
        }

        // Return the response as JSON
        echo json_encode($response);
    } catch (\Throwable $th) {
        // Handle exceptions and return a bad request error
        $response = [
            'status' => 400,
            'message' => 'Bad Request: ' . $th->getMessage(),
        ];
        echo json_encode($response);
    }
}

public function deleteCompany($id) {
           // check the users is logged
           if (!isset($_SESSION['user'])) {
            header('HTTP/1.1 401 Unauthorized');
            echo json_encode(["error" => "User not authenticated"]);
            exit(); 
        }
            //verify the users'role
            if ($_SESSION['user']['role'] !== 'admin') {
                header('HTTP/1.1 403 Forbidden');
                echo json_encode(["error" => "Access denied"]);
                exit(); 
            }
    try {
        // Start a transaction
        $this->db->beginTransaction();

        // Delete related invoices
        $query = "DELETE FROM invoices WHERE company_id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();

        // Delete related contacts
        $query = "DELETE FROM contacts WHERE company_id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();

        // Delete the company itself
        $query = "DELETE FROM companies WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();

        // Commit the transaction
        $this->db->commit();

        echo json_encode(["message" => "Company and related data deleted successfully"]);
    } catch (\Exception $e) {
        // Roll back the transaction in case of an error
        $this->db->rollBack();
        echo json_encode([
            "error" => "Failed to delete company and related data: " . $e->getMessage()
        ]);
    }
}


    public function getCompany($id) {
        $query =    "SELECT companies.id, 
                            companies.name, 
                            companies.type_id, 
                            companies.country, 
                            companies.tva, 
                            DATE_FORMAT(companies.created_at, '%d/%m/%Y') as created_at, 
                            DATE_FORMAT(companies.updated_at, '%d/%m/%Y') as updated_at, 
                            types.name as type 
                    FROM companies 
                        LEFT JOIN types 
                        ON companies.type_id = types.id 
                    WHERE companies.id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        $companyData = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$companyData) {
            echo json_encode(["error" => "Company not found"]); // Return error if company not found
            return;
        }

        $company = new Companies(
            $companyData['id'],
            $companyData['name'],
            $companyData['type_id'],
            $companyData['type'],
            $companyData['country'],
            $companyData['tva'],
            $companyData['created_at'],
            $companyData['updated_at']
        );

        echo json_encode($company); // Return company data encoded in JSON
    }

}
