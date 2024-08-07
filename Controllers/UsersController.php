<?php

namespace App\Controllers;

use App\Models\Users;
use App\Config\Database;
use App\Core\Controller;

class UsersController {
    private $db;

    public function __construct(Database $db) {
        $this->db = $db->connect();
    }

    public function getAllUsers() {
        $query = "SELECT users.*, roles.name FROM users LEFT JOIN roles ON users.role_id = roles.id";
        $stmt = $this->db->query($query);
        $usersData = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        $users = Users::loadData($usersData);
        echo json_encode($users);
    }

    public function createUser() {
        try {
            $params = Users::dataBodyInsert();
            $params['password'] = password_hash($params['password'], PASSWORD_BCRYPT);
    
            $query = "INSERT INTO users (first_name, role_id, last_name, email, password, created_at, updated_at)
                      VALUES (:first_name, 2, :last_name, :email, :password, :created_at, :updated_at)";
            $stmt = $this->db->prepare($query);
            $stmt->execute($params);
            echo json_encode(["message" => "User created successfully"]);
        } catch (\PDOException $e) {
            error_log("Database Error: " . $e->getMessage());
            echo json_encode(["message" => "Database error"]);
        } catch (\Exception $e) {
            error_log("General Error: " . $e->getMessage());
            echo json_encode(["message" => "An error occurred"]);
        }
    }
    

    public function updateUser($id) {
        $params = Users::dataRoleUpdate($id);
        $query = "UPDATE users SET role_id = (SELECT id FROM roles WHERE name LIKE :role), updated_at = :updated_at WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        echo json_encode(["message" => "User role updated successfully"]);
    }

    public function deleteUser($id) {
        $query = "DELETE FROM users WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        echo json_encode(["message" => "User deleted successfully"]);
    }
}
