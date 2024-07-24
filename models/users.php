<?php

namespace App\Models;

class users {
    public int $id;
    public ?string $firstName;
    public int $role_id;
    public ?string $role;
    public ?string $lastName;
    public ?string $email;
    public ?string $password;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct (int $id, ?string $firstName, int $role_id, ?string $role, ?string $lastName, ?string $email, ?string $password, ?string $created_at, ?string $updated_at){
        $this->id = $id;
        $this->firstName = $firstName;
        $this->role_id = $role_id;
        $this->role = $role;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->password = $password;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;  
    }

    public static function loadData($userData) {
        $datas = [];

        foreach ($userData as $user) {
            $datas[] = new self(
                $user['id'], 
                $user['first_name'],
                $user['role_id'],
                $user['name'],
                $user['last_name'],
                $user['email'],
                $user['password'],
                $user['created_at'],
                $user['updated_at']                
            );
        }
        return $datas;
    }

    public static function dataBodyInsert()
    {
        $bodydata = file_get_contents('php://input');
        $bodyDatas = json_decode($bodydata, true);
    
        $params = [
            ':firstName' => self::securityInput($bodyDatas['firstName']),
            ':last_name' => self::securityInput($bodyDatas['lastName']),
            ':email' => self::securityInput($bodyDatas['email']),
            ':password' => self::securityInput($bodyDatas['password']),
            ':created_at' => self::dates('Y-m-d H:i:s'), 
            ':updated_at' => self::dates('Y-m-d H:i:s') 
        ];
    
        return $params;
    }


    public static function dataRoleUpdate($id){

        $bodydata = file_get_contents('php://input');
        $bodyDatas = json_decode($bodydata, true);
 
        $params = [
            ':role' => self::securityInput($bodyDatas['role']),
            ':updated_at' => self::dates('Y-m-d H:i:s'),
            ':id' => self::securityInput(intval($id))
        ];

        // $params = array_merge($paramsBody, $paramsNoBody);

        return $params;

    }

    private static function securityInput($input) {
        return htmlspecialchars(stripslashes(trim($input)));
    }

    private static function dates($format) {
        return date($format);
    }
}