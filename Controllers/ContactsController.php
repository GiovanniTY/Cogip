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

    // function to select all datas of contacts in the DB
    public function getAllContacts(){
        $query = "SELECT * FROM contacts";
        $stmt = $this->db->query($query);
        $contactsData = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        error_log('Contacts data retieved: ' . print_r($contactsData, true));

        $contacts = Contacts::loadData($contactsData);
        // return datas in json
        echo json_encode($contactsData);
    }

    // function to create a new contact
    public function createContact(){
         // Extract and sanitize data from request body
        $params = Contacts::dataBodyInsert();
        $query = "INSERT INTO contacts (name, company_id, email, phone, created_at, updated_at) VALUES (:name, :company_id, :email, :phone, :created_at, :updated_at)";
        $stmt = $this->db->prepare($query);
        // Execute SQL query with parameters
        $stmt->execute($params);
        // Return success message
        echo json_encode(["message" => "Contact is created successfully"]);
    }

    // function to update a contact, using the id(primary key)
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

    // function to delete a contact, using the id(primary key)
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
        $query = "SELECT * FROM contacts WHERE id = :id";
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
            $contactData['email'],
            $contactData['phone'], 
            $contactData['created_at'],
            $contactData['updated_at']
        );
        
        // Return contact data in json
        echo json_encode($contact);
    }
}

