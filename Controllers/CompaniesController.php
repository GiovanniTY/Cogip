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
        $query = "SELECT * FROM companies";
        $stmt = $this->db->query($query);
        $companiesData = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        // Load company data using model


        $companies = Companies::loadData($companiesData); 
        // Return data encoded in JSON
        echo json_encode($companies); 
    }

    public function createCompany() {
        // Extract and sanitize data from request body
        $params = Companies::dataBodyInsert(); 

        $query = "INSERT INTO companies (name, type_id, country, tva, created_at, updated_at) 
                  VALUES (:name, :type_id, :country, :tva, :created_at, :updated_at)";
        $stmt = $this->db->prepare($query);
        // Execute SQL query with parameters
        $stmt->execute($params); 
        // Return success message
        echo json_encode(["message" => "Company created successfully"]); 
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
        $query = "SELECT * FROM companies WHERE id = :id";
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
            $companyData['country'],
            $companyData['tva'],
            $companyData['created_at'],
            $companyData['updated_at']
        );

        echo json_encode($company); // Return company data encoded in JSON
    }

}
