<?php

class companies {

    private int $id;
    private string $name;
    private string $country;
    private string $tva;
    private string $type;
    private DateTime $create;
    private DateTime $update;


    function select(){

        require_once __DIR__.'config/dbconnect.php' ;
        
        $stmt = $connect->prepare("SELECT co.id, co.name, ty.name, co.country, co.tva, co.created_at, co.updated_at FROM companies as co LEFT JOIN types as ty ON co.type_id = ty.id");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }

    function selectInvoices($id){

        require_once __DIR__.'config/dbconnect.php' ;
        
        $stmt = $connect->prepare("SELECT iv.id, iv.ref, co.name, iv.due_date ,iv.created_at, iv.updated_at FROM invoices as iv LEFT JOIN companies as co ON iv.company_id = co.id WHERE iv.company_id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }

    function selectContacts($id){

        require_once __DIR__.'config/dbconnect.php' ;
        
        $stmt = $connect->prepare("SELECT cn.id, cn.name, co.name, cn.email, cn.phone, cn.created_at, cn.updated_at FROM contacts as cn LEFT JOIN companies as co ON cn.companies_id = co.id WHERE cn.company_id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function create($name, $country, $tva, $type){
     
        require_once __DIR__.'config/dbconnect.php' ;

        $stmt = $connect->prepare("INSERT INTO companies (name, type_id, country, tva, created_at, updated_at) VALUES (:name, (SELECT id FROM types WHERE name LIKE :type), :country, :tva, :created_at, :updated_at)");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':type', $type, PDO::PARAM_STR);
        $stmt->bindParam(':country', $country, PDO::PARAM_STR);
        $stmt->bindParam(':tva', $tva, PDO::PARAM_STR);
        $stmt->bindParam(':created_at', date('Y/m/d H:i:s'), PDO::PARAM_STR);
        $stmt->bindParam(':updated_at', date('Y/m/d H:i:s'), PDO::PARAM_STR);
        $stmt->execute();

    }

    function update($id, $name, $type, $country, $tva){

        require_once __DIR__.'config/dbconnect.php' ;

        $stmt = $connect->prepare("UPDATE companies SET name = :name, type_id = (SELECT id FROM types WHERE name LIKE :type), country = :country, tva = :tva, updated_at = :updated_at WHERE id = :id");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':type', $type, PDO::PARAM_STR);
        $stmt->bindParam(':country', $country, PDO::PARAM_STR);
        $stmt->bindParam(':tva', $tva, PDO::PARAM_STR);
        $stmt->bindParam(':updated_at', date('Y/m/d H:i:s'), PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

    }

    function delete($id){

        require_once __DIR__.'config/dbconnect.php' ;

        $stmt = $connect->prepare("DELETE FROM companies WHERE id =:id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

    }
}