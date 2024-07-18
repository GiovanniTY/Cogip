<?php

namespace App\Controllers;
use App\Core\Controller;
require(__DIR__ . '/../config/dbconnect.php');

class CompanyController extends Controller
{
    private $db;
    public function __construct($db = $connect){
        $this->db = $db;
    }
    public function getDB(){
        return $this->db;
    }
    public function index()
    {
        echo "CompanyController index method called\n";
        require(__DIR__ . '/../App/Views/company.php');
        echo "CompanyController index method completed\n";
    }

    public function show($id)
    {
        echo "CompanyController show method called with ID: $id\n";
        require(__DIR__ . '/../Views/show_company.php');
        echo "CompanyController show method completed\n";
    }
}

$test = new CompanyController();
$test->getDB();