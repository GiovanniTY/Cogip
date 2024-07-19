<?php

class Invoices {

    private int $id;
    private string $reference;
    private string $company;
    private int $companyId;
    private DateTime $due_date;
    private DateTime $updated;
    private DateTime $created;

    function __construct($id){

        $this->id = $id;

    }

    function select(){

        require_once '../config/dbconnect.php';
        
        $stmt = $connect->prepare("SELECT iv.id, iv.ref, co.name, iv.due_date ,iv.created_at, iv.updated_at FROM invoices as iv LEFT JOIN companies as co ON iv.company_id = co.id");
        // $stmt->execute();
        if($stmt->execute()){
            echo 'it work';
        }
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }

    function create($ref, $company, $due_date){

        require_once '../config/dbconnect.php';
        $date = date('Y-m-d H:i:s');
        $due = date("Y-m-d", strtotime($due_date));

        $stmt = $connect->prepare("INSERT INTO invoices (ref, company_id, created_at, updated_at, due_date) VALUES (:ref, (SELECT id FROM companies WHERE name LIKE :company), :created_at, :updated_at, :due_date)");
        $stmt->bindParam(':ref', $ref, PDO::PARAM_STR);
        $stmt->bindParam(':company', $company, PDO::PARAM_STR);
        $stmt->bindParam(':created_at', $date, PDO::PARAM_STR);
        $stmt->bindParam(':updated_at', $date, PDO::PARAM_STR);
        $stmt->bindParam(':due_date', $due, PDO::PARAM_STR);
        // $stmt->execute();
        if($stmt->execute()){
            echo 'it work';
        }

    }

    //problem on due date update
    function update($id, $ref, $company, $due_date){

        require_once '../config/dbconnect.php';
        $date = date('Y-m-d H:i:s');
        $due = date("Y-m-d", strtotime($due_date));
        $stmt = $connect->prepare(
            "UPDATE invoices 
            SET ref = :ref, 
                company_id = (SELECT id FROM companies WHERE name LIKE :company), 
                updated_at = :updated_at, 
                due_date = :due_date 
            WHERE id = :id");
        $stmt->bindParam(':ref', $ref, PDO::PARAM_STR);
        $stmt->bindParam(':company', $company, PDO::PARAM_STR);
        $stmt->bindParam(':updated_at', $date, PDO::PARAM_STR);
        $stmt->bindParam(':due_date', $due, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        // $stmt->execute();
        if($stmt->execute()){
            echo 'it work';
        }

    }

    function delete($id){

        require_once '../config/dbconnect.php';

        $stmt = $connect->prepare("DELETE FROM invoices WHERE id =:id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        // $stmt->execute();
        if($stmt->execute()){
            echo 'it work';
        }

    }

}