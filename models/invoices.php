<?php

namespace App\Models;

class Invoices 
{
    public int $id;
    public ?string $reference;
    public int $company_id;
    public ?string $companyName;
    public ?string $due_date;
    public ?string $created_at;
    public ?string $updated_at;

    function __construct(int $id, ?string $reference, int $company_id ,?string $companyName, ?string $due_date, ?string $created_at, ?string $updated_at)
    {
        $this->id = $id;
        $this->reference = $reference;
        $this->company_id = $company_id;
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
                $invoice['company_id'],
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
            ':company_id' => self::securityInput($bodyDatas['company_id']),
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


}
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");