<?php 
    namespace App\Models;

    class User{
        private string $firstName;
        private string $lastName;
        private string $email;
        private string $password;
        private int $roleId;

        public function __construct(?string $firstName='', ?string $lastName='', ?string $email='', string $password, int $roleId){
            $this->firstName = securityInput($firstName);
            $this->lastName = securityInput($lastName);
            $this->email = securityInput($email);          
            $this->password = securityInput($password);
            $this->roleId = $roleId;
        }

        public function getAll(){
            $dataInJson = json_encode(
                [
                    'firstName' => $this->firstName,
                    'lastName'=> $this->lastName,
                    'email'=> $this->email,
                    'password'=> $this->password,
                    'role'=> $this->roleId
                ]
            );
            return $dataInJson;
        }

        public static function dataBodyInsert(){
            $bodyData = [];
            $bodyData = file_get_contents('php://input');
            $bodyDatas = json_decode($bodyData, true);

            $params =[
                'email' => securityInput($bodyDatas['email'] ?? ''),
                'password'=> securityInput($bodyDatas['password'] ?? '')
            ];
            return $params;
        }
    }