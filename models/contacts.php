<?php

class contacts {
    
    private int $id;
    private string $name;
    private string $company;
    private int $companyId;
    private string $email;
    private string $phone;
    private DateTime $updated;
    private DateTime $created;

    function select(){

        require_once __DIR__.'config/dbconnect.php' ;
        
        $stmt = $connect->prepare("SELECT cn.id, cn.name, co.name, cn.email, cn.phone, cn.created_at, cn.updated_at FROM contacts as cn LEFT JOIN companies as co ON cn.companies_id = co.id");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }

    function create($name, $company, $email, $phone){
     
        require_once __DIR__.'config/dbconnect.php' ;

        $stmt = $connect->prepare("INSERT INTO contacts (name, company_id, email, phone, created_at, updated_at) VALUES (:name, (SELECT id FROM companies WHERE name LIKE :company), :email, :phone, :created_at, :updated_at)");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':company', $company, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
        $stmt->bindParam(':created_at', date('Y/m/d H:i:s'), PDO::PARAM_STR);
        $stmt->bindParam(':updated_at', date('Y/m/d H:i:s'), PDO::PARAM_STR);
        $stmt->execute();

    }

    function update($id, $name, $company, $email, $phone){

        require_once __DIR__.'config/dbconnect.php' ;

        $stmt = $connect->prepare("UPDATE contacts SET name = :name, company_id = (SELECT id FROM companies WHERE name LIKE :company), email = :email, phone = :phone, updated_at = :updated_at WHERE id = :id");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':company', $company, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
        $stmt->bindParam(':updated_at', date('Y/m/d H:i:s'), PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

    }

    function delete($id){

        require_once __DIR__.'config/dbconnect.php' ;

        $stmt = $connect->prepare("DELETE FROM contacts WHERE id =:id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

    }


}