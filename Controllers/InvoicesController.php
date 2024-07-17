<?php

namespace App\Controllers;

class InvoicesController
{
    public function index()
    {
        require(__DIR__ . '/../views/invoices.php');
    }
}

?>