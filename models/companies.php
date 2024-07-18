<?php

class Companies {

    private int $id;
    private string $name;
    private string $country;
    private string $tva;
    private string $type;
    private DateTime $create;
    private DateTime $update;

    function __construct($id){

        $this->id = $id;

    }
        
    

    function select(){

        require_once '../config/dbconnect.php';
        
        $stmt = $connect->prepare("SELECT co.id, co.name, ty.name, co.country, co.tva, DATE_FORMAT(co.created_at, '%d/%m/%Y') as created, DATE_FORMAT(co.updated_at, '%d/%m/%Y') as updated FROM companies as co LEFT JOIN types as ty ON co.type_id = ty.id");
        // $stmt->execute();
        if($stmt->execute()){
            echo 'it work';
        }
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        
    }

    function selectInvoices($id){

        require_once '../config/dbconnect.php';
        
        $stmt = $connect->prepare("SELECT iv.id, iv.ref, co.name,  DATE_FORMAT(iv.due_date, '%d/%m/%Y') as due, DATE_FORMAT(iv.created_at, '%d/%m/%Y') as created, DATE_FORMAT(iv.updated_at, '%d/%m/%Y') as updated FROM invoices as iv LEFT JOIN companies as co ON iv.company_id = co.id WHERE iv.company_id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        // $stmt->execute();
        if($stmt->execute()){
            echo 'it work';
        }
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }



    function selectContacts($id){

        require_once '../config/dbconnect.php';
        
        $stmt = $connect->prepare("SELECT cn.id, cn.name, co.name, cn.email, cn.phone, DATE_FORMAT(cn.created_at, '%d/%m/%Y') as created, DATE_FORMAT(cn.updated_at, '%d/%m/%Y') as updated FROM contacts as cn LEFT JOIN companies as co ON cn.company_id = co.id WHERE cn.company_id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        // $stmt->execute();
        if($stmt->execute()){
            echo 'it work';
        }
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function Checktype($type){
        return true;
    }

    function create($name, $type, $country, $tva){
     
        require_once '../config/dbconnect.php';
        $date = date('Y-m-d H:i:s');

        $stmt = $connect->prepare("INSERT INTO companies (name, type_id, country, tva, created_at, updated_at) VALUES (:name, (SELECT id FROM types WHERE name LIKE :type), :country, :tva, :created_at, :updated_at)");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':type', $type, PDO::PARAM_STR);
        $stmt->bindParam(':country', $country, PDO::PARAM_STR);
        $stmt->bindParam(':tva', $tva, PDO::PARAM_STR);
        $stmt->bindParam(':created_at', $date, PDO::PARAM_STR);
        $stmt->bindParam(':updated_at', $date, PDO::PARAM_STR);
        // $stmt->execute();
        if($stmt->execute()){
            echo 'it work';
        }

    }

    function update($id, $name, $type, $country, $tva){

        if (Checktype($type)){
            require_once '../config/dbconnect.php';
            $date = date('Y-m-d H:i:s');
            $stmt = $connect->prepare("UPDATE companies SET name = :name, type_id = (SELECT id FROM types WHERE name LIKE :type), country = :country, tva = :tva, updated_at = :updated_at WHERE id = :id");
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':type', $type, PDO::PARAM_STR);
            $stmt->bindParam(':country', $country, PDO::PARAM_STR);
            $stmt->bindParam(':tva', $tva, PDO::PARAM_STR);
            $stmt->bindParam(':updated_at', $date, PDO::PARAM_STR);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            // $stmt->execute();
            if($stmt->execute()){
                echo 'it work';
            }
        }
        

    }


    function delete($id){
        
        require_once '../config/dbconnect.php';

        $stmt1 = $connect->prepare("DELETE FROM invoices WHERE company_id =:id");
        $stmt1->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt1->execute();

        $stmt2 = $connect->prepare("DELETE FROM contacts WHERE company_id =:id");
        $stmt2->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt2->execute();

        $stmt = $connect->prepare("DELETE FROM companies WHERE id =:id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        // $stmt->execute();
        if($stmt->execute()){
            echo 'it work';
        }

    }
}