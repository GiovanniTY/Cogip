<?php

namespace App\Models;

class Companies
{
    public int $id;
    public ?string $name;
    public ?string $typeName;
    public ?string $country;
    public ?string $tva;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(int $id, ?string $name, ?string $typeName, ?string $country, ?string $tva, ?string $created_at, ?string $updated_at) {
        $this->id = $id;
        $this->name = $name;
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
                $companie['country'],
                $companie['tva'],
                $companie['created_at'],
                $companie['updated_at']
            );
        }
        return $datas;
    }

    public static function dataBodyInsert() {
        $bodydata = file_get_contents('php://input');
        $bodyDatas = json_decode($bodydata, true);
        $params = [
            ':name' => self::securityInput($bodyDatas['name']),
            ':type_id' => self::securityInput(intval($bodyDatas['type_id'])),
            ':country' => self::securityInput($bodyDatas['country']),
            ':tva' => self::securityInput($bodyDatas['tva']),
            ':created_at' => self::dates('Y-m-d h:i:s'),
            ':updated_at' => self::dates('Y-m-d h:i:s')
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


    // function create($name, $type, $country, $tva){
     
    //     require_once '../config/dbconnect.php';
    //     $date = date('Y-m-d H:i:s');

    //     $stmt = $connect->prepare("INSERT INTO companies (name, type_id, country, tva, created_at, updated_at) VALUES (:name, (SELECT id FROM types WHERE name LIKE :type), :country, :tva, :created_at, :updated_at)");
    //     $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    //     $stmt->bindParam(':type', $type, PDO::PARAM_STR);
    //     $stmt->bindParam(':country', $country, PDO::PARAM_STR);
    //     $stmt->bindParam(':tva', $tva, PDO::PARAM_STR);
    //     $stmt->bindParam(':created_at', $date, PDO::PARAM_STR);
    //     $stmt->bindParam(':updated_at', $date, PDO::PARAM_STR);
    //     // $stmt->execute();
    //     if($stmt->execute()){
    //         echo 'it work';
    //     }

    // }

    // function update($id, $name, $type, $country, $tva){

    //     if (Checktype($type)){
    //         require_once '../config/dbconnect.php';
    //         $date = date('Y-m-d H:i:s');
    //         $stmt = $connect->prepare("UPDATE companies SET name = :name, type_id = (SELECT id FROM types WHERE name LIKE :type), country = :country, tva = :tva, updated_at = :updated_at WHERE id = :id");
    //         $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    //         $stmt->bindParam(':type', $type, PDO::PARAM_STR);
    //         $stmt->bindParam(':country', $country, PDO::PARAM_STR);
    //         $stmt->bindParam(':tva', $tva, PDO::PARAM_STR);
    //         $stmt->bindParam(':updated_at', $date, PDO::PARAM_STR);
    //         $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    //         // $stmt->execute();
    //         if($stmt->execute()){
//                 echo 'it work';
//             }
//         }
        

//     }


//     function delete($id){
        
//         require_once '../config/dbconnect.php';

//         $stmt1 = $connect->prepare("DELETE FROM invoices WHERE company_id =:id");
//         $stmt1->bindParam(':id', $id, PDO::PARAM_INT);
//         $stmt1->execute();

//         $stmt2 = $connect->prepare("DELETE FROM contacts WHERE company_id =:id");
//         $stmt2->bindParam(':id', $id, PDO::PARAM_INT);
//         $stmt2->execute();

//         $stmt = $connect->prepare("DELETE FROM companies WHERE id =:id");
//         $stmt->bindParam(':id', $id, PDO::PARAM_INT);
//         // $stmt->execute();
//         if($stmt->execute()){
//             echo 'it work';
//         }

//     }
// }
    private static function securityInput($input) {
        return htmlspecialchars(stripslashes(trim($input)));
    }

    private static function dates($format) {
        return date($format);
    }
}
