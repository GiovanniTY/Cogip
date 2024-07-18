<?php

namespace App\Config;

use PDO;
use PDOException;

class Database{
    private $host = 'localhost';
    private $username = 'root';
    private $password = 'root';
    private $dbname = 'cogips';
    private $conn;

    public function connect() {
        $this->conn = null;

        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->dbname, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'Connexion à la base de données échouée : ' . $e->getMessage();
        }

        return $this->conn;
    }

    public function query($query) {
        return $this->conn->query($query);
    }

    public function prepare($query) {
        return $this->conn->prepare($query);
    }
}
