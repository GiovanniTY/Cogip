<?php 
    namespace App\Controllers;

    use App\config\Database;
    use App\Models\User;

    class LoginController{
        private Database $database;

        public function __construct(Database $database){
            $this->database = $database;
        }
        // method to login
        public function login(){
            try{    
                $dataBody = User::dataBodyInsert();
                $params =[
                    'userEmail' => $dataBody['userEmail']
                ];
                $query = "SELECT `users`.`first_name`, `users`.`role_id`, `users`.`last_name`, `users`.`email`, `users`.`password`, `roles`.`id`, `roles`.`name` FROM users JOIN roles ON `users`.`role_id`= `roles`.`id` WHERE `users`.`email` = :userEmail";
                $stmt = $this->database->prepare($query);
                $stmt->bindParam(':userEmail', $id, \PDO::PARAM_STR);
                $stmt->execute();
                $userExist = $stmt->fetch(\PDO::FETCH_ASSOC);
                
                if($userExist){
                    if(password_verify($dataBody['password'], $userExist[0]['password'])){
                        $key = generateApiKey();
                        $_SESSION['user'][$key] = [
                            'roles' => $userExist[0]['name']
                        ];
                        $response = [
                            'status' => 201,
                            'message'=> 'successful login',
                            'first_name' => $userExist[0]['first_name'],
                            'last_name'=> $userExist[0]['last_name'],
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
