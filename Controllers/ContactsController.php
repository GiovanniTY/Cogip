<?php

namespace App\Controllers;

use App\Models\Contacts;
use App\Config\Database;
use App\Core\Controller;

class ContactsController {
    private $db;
    
    public function __construct(Database $db){
        // initialize DB object in constructor
        $this->db = $db->connect();
    }

    // Function to select all datas of contacts in the DB
    public function getAllContacts(){
        $query =    "SELECT contacts.id, 
                            contacts.name, 
                            contacts.company_id, 
                            contacts.email, 
                            contacts.phone, 
                            DATE_FORMAT(contacts.created_at, '%d/%m/%Y') as created_at, 
                            DATE_FORMAT(contacts.updated_at, '%d/%m/%Y') as updated_at, 
                            companies.name as company 
                    FROM contacts 
                        LEFT JOIN companies 
                        ON contacts.company_id = companies.id 
                    ORDER BY contacts.created_at DESC";
        $stmt = $this->db->query($query);
        $contactsData = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        error_log('Contacts data retieved: ' . print_r($contactsData, true));

        $contacts = Contacts::loadData($contactsData);
        // return datas in json
        echo json_encode($contactsData);
    }

    // Function to create a new contact
    public function createContact(){
        // Extract and sanitize data from request body
        $params = Contacts::dataBodyInsert();
        $query = "INSERT INTO contacts (name, company_id, email, phone, created_at, updated_at) VALUES (:name, (SELECT id FROM companies WHERE name LIKE :company), :email, :phone, :created_at, :updated_at)";
        $stmt = $this->db->prepare($query);
        // Execute SQL query with parameters
        $stmt->execute($params);

        // Return success message
        echo json_encode(["message" => "Contact is created successfully"]);
    }

    // Function to update a contact, using the id(primary key)
    public function updateContact($id){
        // Extract and sanitize data from request body for update
        $params = Contacts::dataBodyUpdate($id);
        $query = "UPDATE contacts SET {$params['paramsSet']} WHERE id = :id";
        $stmt = $this->db->prepare($query);

        // Execute SQL query with parameters
        $stmt->execute($params['paramsBody']);


        // Return success message
        echo json_encode(["message" => "Contact is updated successfully"]); 
    }

    // Function to delete a contact, using the id(primary key)
    public function deleteContact($id){
        $query = "DELETE FROM contacts WHERE id =:id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);


        // Execute SQL delete query
        $stmt->execute();


        // Return success message
        echo json_encode(["message" => "Contact is deleted successfully"]); 
    }

     // Function to get a single contact by id
    public function getContact($id) {
        $query =    "SELECT contacts.id, 
                            contacts.name, 
                            contacts.company_id, 
                            contacts.email, 
                            contacts.phone, 
                            DATE_FORMAT(contacts.created_at, '%d/%m/%Y') as created_at, 
                            DATE_FORMAT(contacts.updated_at, '%d/%m/%Y') as updated_at, 
                            companies.name as company 
                    FROM contacts 
                        LEFT JOIN companies 
                        ON contacts.company_id = companies.id 
                    WHERE contacts.id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        $contactData = $stmt->fetch(\PDO::FETCH_ASSOC);


        if (!$contactData) {
            // Return error if contact isn't found
            echo json_encode(["error" => "Contact isn't found"]); 
            return;
        }

        $contact = new Contacts(
            $contactData['id'],
            $contactData['name'],
            $contactData['company_id'],
            $contactData['company'],
            $contactData['email'],
            $contactData['phone'], 
            $contactData['created_at'],
            $contactData['updated_at']
        );
        
        // Return contact data in json
        echo json_encode($contact->toArray());
    }

    public function getAllCompanyContact($id) {
        $query =    "SELECT contacts.id, 
                            contacts.name, 
                            contacts.company_id, 
                            contacts.email, 
                            contacts.phone, 
                            DATE_FORMAT(contacts.created_at, '%d/%m/%Y') as created_at, 
                            DATE_FORMAT(contacts.updated_at, '%d/%m/%Y') as updated_at, 
                            companies.name as company 
                    FROM contacts 
                        LEFT JOIN companies 
                        ON contacts.company_id = companies.id 
                    WHERE contacts.company_id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        $contactsData = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        error_log('Contacts data retieved: ' . print_r($contactsData, true));

        // $contacts = Contacts::loadData($contactsData);
        // return datas in json
        echo json_encode($contactsData);
        
    }
}
