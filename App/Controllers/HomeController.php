<?php

namespace App\Controllers;

class HomeController
{
    public function index()
    {
        //charger la home page
        require '../../Views/welcome.php';
    }
}
