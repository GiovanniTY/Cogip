<?php

namespace App\Models;

class Invoices 
{
    public int $id;
    public ?string $reference;
    public ?string $companyName;
    public ?string $due_date;
    public ?string $created_at;
    public ?string $updated_at;

    function __construct(int $id, ?string $reference, ?string $companyName, ?string $due_date, ?string $created_at, ?string $updated_at)
    {
        $this->id = $id;
        $this->reference = $reference;
        $this->companyName = $companyName;
        $this->due_date = $due_date;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }//end constructor

    public static function loadData($invoicesData) 
    {
        $datas = [];

        foreach ($invoicesData as $invoice) {
            $datas[] = new self(
                $invoice['id'], 
                $invoice['reference'],
                $invoice['companyName'],
                $invoice['due_date'],
                $invoice['created_at'],
                $invoice['updated_at']
            );
        }
        return $datas;
    }

    public static function dataBodyInsert() 
    {
        $bodydata = file_get_contents('php://input');
        $bodyDatas = json_decode($bodydata, true);

        $params = [
            ':ref' => self::securityInput($bodyDatas['reference']),
            ':companyName' => self::securityInput(intval($bodyDatas['company'])),
            ':due_date' => self::dates("Y-m-d", strtotime(str_replace('/', '-', $bodyDatas['due_date']))),
            ':created_at' => self::dates('Y-m-d h:i:s', null),
            ':updated_at' => self::dates('Y-m-d h:i:s', null)
        ];

        return $params;
    }

    //need to find how to change so that I can update due_date in the right format Also neeed to look to update company trought company name and not company_id
    public static function dataBodyUpdate($id)
    {
        $bodydata = file_get_contents('php://input');
        $bodyDatas = json_decode($bodydata, true);

        $paramsBody = [];
        $paramsSet = '';

        foreach ($bodyDatas as $key => $value) {
            if ($key == 'due_date'){
                $paramsBody[":{$key}"] = self::dates("Y-m-d", strtotime(str_replace('/', '-', $value)));
            }else{
                $paramsBody[":{$key}"] = self::securityInput($value);
            }
            
        }
        foreach ($bodyDatas as $key => $value) {
            $paramsSet .= "{$key} = :{$key}, ";
        }
        $paramsSet .= 'updated_at = :updated_at';

        $paramsNoBody = [
            ':id' => self::securityInput(intval($id)),
            ':updated_at' => self::dates('Y-m-d h:i:s', null)
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

    private static function dates($format, ?string $date) {
        if ($date == null){
           return date($format); 
        }else{
            return date($format, $date);
        }
        
    }

    // private static function dates($format, $date) {
    //     return date($format, $date);
    // }

    //problem on due date update
    // function update($id, $ref, $company, $due_date){

    //     require_once '../config/dbconnect.php';
    //     $date = date('Y-m-d H:i:s');
    //     $due = date("Y-m-d", strtotime(str_replace('/', '-', $due_date)));
    //     echo $due;
    //     $stmt = $connect->prepare(
    //         "UPDATE invoices 
    //         SET ref = :ref, 
    //             company_id = (SELECT id FROM companies WHERE name LIKE :company), 
    //             updated_at = :updated_at, 
    //             due_date = :due_date 
    //         WHERE id = :id");
    //     $stmt->bindParam(':ref', $ref, PDO::PARAM_STR);
    //     $stmt->bindParam(':company', $company, PDO::PARAM_STR);
    //     $stmt->bindParam(':updated_at', $date, PDO::PARAM_STR);
    //     $stmt->bindParam(':due_date', $due, PDO::PARAM_STR);
    //     $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    //     // $stmt->execute();
    //     if($stmt->execute()){
    //         echo 'it work';
    //     }

    // }

}