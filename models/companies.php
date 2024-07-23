<?php

namespace App\Models;

class Companies
{
    public int $id;
    public ?string $name;
    public int $type_id;
    public ?string $typeName;
    public ?string $country;
    public ?string $tva;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(int $id, ?string $name, int $type_id, ?string $typeName, ?string $country, ?string $tva, ?string $created_at, ?string $updated_at) {
        $this->id = $id;
        $this->name = $name;
        $this->type_id = $type_id;
        $this->typeName = $typeName;
        $this->country = $country;
        $this->tva = $tva;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public static function loadData($companiesData) {
        $datas = [];

        foreach ($companiesData as $companie) {
            $datas[] = new self(
                $companie['id'], 
                $companie['name'],
                $companie['type_id'],
                $companie['type'],
                $companie['country'],
                $companie['tva'],
                $companie['created_at'],
                $companie['updated_at']
            );
        }
        return $datas;
    }
    public static function dataBodyInsert()
    {
        $bodydata = file_get_contents('php://input');
        $bodyDatas = json_decode($bodydata, true);
    
        $params = [
            ':name' => self::securityInput($bodyDatas['name']),
            ':type_id' => self::securityInput(intval($bodyDatas['type_id'])),
            ':country' => self::securityInput($bodyDatas['country']),
            ':tva' => self::securityInput($bodyDatas['tva']),
            ':created_at' => self::dates('Y-m-d H:i:s'), 
            ':updated_at' => self::dates('Y-m-d H:i:s') 
        ];
    
        return $params;
    }
    

    public static function dataBodyUpdate($id) {
        $bodydata = file_get_contents('php://input');
        $bodyDatas = json_decode($bodydata, true);

        $paramsBody = [];
        $paramsSet = '';

        foreach ($bodyDatas as $key => $value) {
            $paramsBody[":{$key}"] = self::securityInput($value);
        }
        foreach ($bodyDatas as $key => $value) {
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
    
    private static function securityInput($input) {
        return htmlspecialchars(stripslashes(trim($input)));
    }

    private static function dates($format) {
        return date($format);
    }
}
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
