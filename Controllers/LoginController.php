<?php 
    namespace App\Controllers;

    use App\Config\Database;
    use App\Models\User;

    class LoginController{
        private $db;

        public function __construct(Database $db){
            $this->db = $db->connect();
        }
        // method to login
        public function login(){
            try{    
                $dataBody = User::dataBodyInsert();
                $params =[
                    'email' => $dataBody['email']
                ];
                $query = "SELECT `users`.`first_name`, `users`.`role_id`, `users`.`last_name`, `users`.`email`, `users`.`password`, `roles`.`id`, `roles`.`name` FROM users JOIN roles ON `users`.`role_id`= `roles`.`id` WHERE `users`.`email` = :email";
                $stmt = $this->db->prepare($query);
                $stmt->bindParam(':email', $params['email'], \PDO::PARAM_STR);
                $stmt->execute();
                $userExist = $stmt->fetch(\PDO::FETCH_ASSOC);
                
                if($userExist){
                    if($dataBody['password'] === $userExist['password']){
                        $key = generateApiKey();
                        $_SESSION['user'][$key] = [
                            'roles' => $userExist['name']
                        ];
                        $response = [
                            'status' => 201,
                            'message'=> 'successful login',
                            'first_name' => $userExist['first_name'],
                            'last_name'=> $userExist['last_name'],
                            'key' => $key
                        ];
                        echo createJson($response);
                    }
                    else{
                        $response = [
                            'status'=> 401,
                            'message'=> 'error login'
                        ];
                        echo createJson($response);
                    }
                }
            }
            catch(\Throwable $e){
                $response = [
                    'status'=> 400,
                    'message'=> 'bad request'
                ];
                echo createJson($response);
                echo $e;
            }
        }
        // method to logout
        public function logout($key){
            unset($_SESSION['user'][$key]);
            $response = [
                'status'=> 200,
                'message'=> 'successful logout'
            ];
            echo createJson($response);
        }
    }
