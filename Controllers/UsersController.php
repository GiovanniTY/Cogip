<?php

namespace App\Controllers;

use App\Models\Users;
use App\Config\Database; 
use App\Core\Controller;

class UsersController {

    private $db;

    public function __construct(Database $db) {
        // Initialise and construct object
        $this->db = $db->connect(); 
    }

    public function getAllUsers() {
        $query = "SELECT users.*, roles.name  FROM users LEFT JOIN roles ON users.role_id = roles.id";
        $stmt = $this->db->query($query);
        $usersData = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        // Load company data using model


        $users = Users::loadData($usersData); 
        // Return data encoded in JSON
        echo json_encode($users); 
    }

    public function createUser() {
        // GET the require data to insert in table
        $params = Users::dataBodyInsert();
    
        // sql QUERRY TO INSERT A NEW LINE IN db
        $query = "INSERT INTO users (first_name, role_id, last_name, email, password, created_at, updated_at)
                  VALUES (:firstName, 2, :last_name, :email, :password, :created_at, :updated_at)";
    
        // prepare the SQL statement
        $stmt = $this->db->prepare($query);
    
        // try to execute the querry with the params
        $stmt->execute($params);
    
        // return a message that inform the sucess of the operation
        echo json_encode(["message" => "User created successfully"]);
    }


    //don't work
    public function updateUser($id) {
        $params = Users::dataRoleUpdate($id); // Extract and sanitize data from request body for update

        $query = "UPDATE users SET role_id = (SELECT id FROM roles WHERE name LIKE :role), updated_at = :updated_at WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->execute($params); // Execute SQL query with parameters

        echo json_encode(["message" => "User role updated successfully"]); // Return success message
    }

    public function deleteUser($id) {
        $query = "DELETE FROM users WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute(); // Execute SQL delete query

        echo json_encode(["message" => "User deleted successfully"]); // Return success message
    }
}