<?php
    // DB information
    $host = 'localhost';
    $dbname = 'cogips';
    $username = 'root';
    $password = "";

    // DB Connection 
    try{
        $connect = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }     
    catch (PDOException $e) {
        die("Erreur <br>" . $e->getMessage());
    }