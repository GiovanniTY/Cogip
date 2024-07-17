<?php

namespace App\Controllers;

class CompanyController
{
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

?>