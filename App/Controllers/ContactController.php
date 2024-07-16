<?php

namespace App\Controllers;

class ContactController
{
    public function index()
    {
        
        require(__DIR__ . '/../views/contact.php');
    }

    public function show($id)
    {
        
        require(__DIR__ . '/../views/show_contact.php');
    }
}

?>