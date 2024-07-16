<?php


namespace App\Controllers;

class CompanyController
{
    public function index()
    {
        echo "Index method called";
        require(__DIR__ . '/../../Views/company.php');

    }

    public function show($id)
    {
        
        require(__DIR__ . '/../Views/show_company.php');
    }
}

?>
