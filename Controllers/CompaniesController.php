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
        try {
        // Extract and sanitize data from the request body
        $params = Companies::dataBodyInsert();
    
        // SQL query for entering a new company
        $query = "INSERT INTO companies (name, type_id, country, tva, created_at, updated_at)
                  VALUES (:name, :type_id, :country, :tva, :created_at, :updated_at)";
    
        // Prepare stmt 
        $stmt = $this->db->prepare($query);
    
        // execute the query 
        $stmt->execute($params);

        
    
        $response = [
            'status' => 202,
            'message' => 'OK',
            'params' => $params
        ];

        echo createJson($response);
    } catch (\Throwable $th) {
        $response = [
            'status' => 500,
            'message' => 'Bad Request',
        ];

        echo createJson($response);
    }
}

    
    

    public function updateCompany($id) {
        $params = Companies::dataBodyUpdate($id); // Extract and sanitize data from request body for update

        $query = "UPDATE companies SET {$params['paramsSet']} WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->execute($params['paramsBody']); // Execute SQL query with parameters

        echo json_encode(["message" => "Company updated successfully"]); // Return success message
    }

    public function deleteCompany($id) {
        $query = "DELETE FROM companies WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute(); // Execute SQL delete query

        echo json_encode(["message" => "Company deleted successfully"]); // Return success message
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
