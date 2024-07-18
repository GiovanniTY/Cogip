<?php

require_once '/models/companies.php';

class CompaniesController {

    public function getAllCompanies() {
        $company = new Companies(0);
        $data = $company->select();
        echo json_encode($data);
    }

    public function getCompanyInvoices($id) {
        $company = new Companies($id);
        $data = $company->selectInvoices($id);
        echo json_encode($data);
    }

    public function getCompanyContacts($id) {
        $company = new Companies($id);
        $data = $company->selectContacts($id);
        echo json_encode($data);
    }

    public function createCompany() {
        $body = json_decode(file_get_contents('php://input'), true);
        $company = new Companies(0);
        $company->create($body['name'], $body['type'], $body['country'], $body['tva']);
        http_response_code(201);
        echo json_encode(['message' => 'Company created']);
    }

    public function updateCompany($id) {
        $body = json_decode(file_get_contents('php://input'), true);
        $company = new Companies($id);
        $company->update($id, $body['name'], $body['type'], $body['country'], $body['tva']);
        http_response_code(200);
        echo json_encode(['message' => 'Company updated']);
    }

    public function deleteCompany($id) {
        $company = new Companies($id);
        $company->delete($id);
        http_response_code(200);
        echo json_encode(['message' => 'Company deleted']);
    }
}