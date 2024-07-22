<?php

namespace App\Models;

class Contacts {
    // Declaration of private properties
    private int $id;
    private ?string $name;
    private ?int $companyId;
    private ?string $email;
    private ?string $phone;
    private ?string $updated;
    private ?string $created;

    // Constructor to initialize properties
    public function __construct(int $id, ?string $name, ?int $companyId, ?string $email, ?string $phone, ?string $created, ?string $updated){
        $this->id = $id;
        $this->name = $name;
        $this->companyId = $companyId;
        $this->email = $email;
        $this->phone = $phone;
        $this->created = $created;
        $this->updated = $updated;
    }

    // Static method to load data
    public static function loadData($contactsData){
        $datas = [];
        foreach($contactsData as $contact){
            // Log to verify the data received
            error_log('Loading contact: ' . print_r($contact, true));

            // Create a Contacts object for each contact
            $datas[] = new self(
                $contact['id'],
                $contact['name'],
                $contact['company_id'],
                $contact['email'], 
                $contact['phone'],
                $contact['created_at'],
                $contact['updated_at']
            );
        }
        return $datas;
    }
    
    // Static method to insert data
    public static function dataBodyInsert(){
        $bodyData = file_get_contents('php://input');
        $bodyDatas = json_decode($bodyData, true);

        // Log to verify the request body data
        error_log('Body data insert: ' . print_r($bodyDatas, true));

        $params = [
            ':name' => self::securityInput($bodyDatas['name']),
            ':company_id' => self::securityInput($bodyDatas['company_id']),
            ':email'=> self::securityInput($bodyDatas['email']),
            ':phone'=> self::securityInput($bodyDatas['phone']),
            ':created_at'=> self::dates('Y-m-d h:i:s'),
            ':updated_at'=> self::dates('Y-m-d h:i:s')
        ];
        return $params;
    }

    // Static method to update data
    public static function dataBodyUpdate($id){
        $bodyData = file_get_contents('php://input');
        $bodyDatas = json_decode($bodyData, true);

        // Log to verify the request body data
        error_log('Body data update: ' . print_r($bodyDatas, true));

        $paramsBody = [];
        $paramsSet = '';
        foreach($bodyDatas as $key => $value){
            $paramsBody[":{$key}"] = self::securityInput($value);
        }
        foreach($bodyDatas as $key => $value){
            $paramsSet .= "{$key} = :{$key}, ";
        }
        $paramsSet .= 'updated_at = :updated_at';
        $paramsNoBody = [
            ':id' => self::securityInput(intval($id)),
            ':updated_at' => self::dates('Y-m-d h:i:s')
        ];
        $params = array_merge($paramsBody, $paramsNoBody);
        return [
            "paramsBody" => $params,
            "paramsSet" => $paramsSet
        ];
    }

    // Method for input security
    private static function securityInput($input){
        return htmlspecialchars(stripslashes(trim($input)));
    }

    // Method to get formatted dates
    private static function dates($format){
        return date($format);
    }

    // Method to convert object to array for JSON serialization
    public function toArray(): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'company_id' => $this->companyId,
            'email' => $this->email,
            'phone' => $this->phone,
            'created_at' => $this->created,
            'updated_at' => $this->updated,
        ];
    }
}
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
