<?php
namespace App\Models;
class Contacts {
    
    private int $id;
    private ?string $name;
    private ?int $companyId;
    private ?string $email;
    private ?string $phone;
    private ?string $updated;
    private ?string $created;

    public function __construct(int $id, ?string $name, ?string $companyId, ?string $email, ?string $phone, ?string $updated, ?string $created){
        $this->id = $id;
        $this->name = $name;
        $this->companyId = $companyId;
        $this->email = $email;
        $this->phone = $phone;
        $this->updated = $updated;
        $this->created = $created;
    }

    public static function loadData($contactsData){
        $datas = [];
        foreach($contactsData as $contact){
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
    public static function dataBodyInsert(){
        $bodyData = file_get_contents('php://input');
        $bodyDatas = json_decode($bodyData, true);
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

    public static function dataBodyUpdate($id){
        $bodyData = file_get_contents('php://input');
        $bodyDatas = json_decode($bodyData, true);
        $paramsBody = [];
        $paramsSet = [];
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
    private static function securityInput($input){
        return htmlspecialchars(stripslashes(trim($input)));
    }
    private static function dates($format){
        return date($format);
    }
}