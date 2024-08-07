<?php
namespace App\Controllers;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
use App\Config\Database;
use App\Models\Login;

class LoginController {
    private $db;

    public function __construct(Database $db) {
        $this->db = $db->connect();
        session_start();
    }

    public function login() {
        try {
            $dataBody = Login::dataBodyInsert();
            $params = ['email' => $dataBody['email']];

            $query = "SELECT users.first_name, users.role_id, users.last_name, users.email, users.password, roles.id, roles.name 
                      FROM users 
                      JOIN roles ON users.role_id = roles.id 
                      WHERE users.email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':email', $params['email'], \PDO::PARAM_STR);
            $stmt->execute();
            $userExist = $stmt->fetch(\PDO::FETCH_ASSOC);

            if ($userExist) {
                if (password_verify($dataBody['password'], $userExist['password'])) {
                    $key = $this->generateApiKey();
                    $_SESSION['user'][$key] = [
                        'roles' => $userExist['name']
                    ];
                    $response = [
                        'status' => 201,
                        'message' => 'successful login',
                        'first_name' => $userExist['first_name'],
                        'last_name' => $userExist['last_name'],
                        'key' => $key
                    ];
                    echo $this->createJson($response);
                } else {
                    $response = [
                        'status' => 401,
                        'message' => 'Incorrect password'
                    ];
                    echo $this->createJson($response);
                }
            } else {
                $response = [
                    'status' => 404,
                    'message' => 'User not found'
                ];
                echo $this->createJson($response);
            }
        } catch (\Throwable $e) {
            $response = [
                'status' => 400,
                'message' => 'Bad request'
            ];
            echo $this->createJson($response);
        }
    }

    public function logout($key) {
        if (isset($_SESSION['user'][$key])) {
            unset($_SESSION['user'][$key]);
            $response = [
                'status' => 200,
                'message' => 'Successful logout'
            ];
            echo $this->createJson($response);
        } else {
            $response = [
                'status' => 400,
                'message' => 'Invalid session key'
            ];
            echo $this->createJson($response);
        }
    }

    private function generateApiKey() {
        return bin2hex(random_bytes(16));
    }

    private function createJson($response) {
        return json_encode($response);
    }
}
