<?php

namespace App\Routes;

use Bramus\Router\Router;
use App\Controllers\HomeController;
use App\Config\Database;
use App\Controllers\CompaniesController;
use App\Controllers\ContactsController;

$router = new Router();

$router->mount('/companies', function () use ($router) {

    // Route to get all companies
    $router->get('/', function () {
        $db = new Database();
        return (new CompaniesController($db))->getAllCompanies();
    });

    // Route to view details of a specific company
    $router->get('/view/(\d+)', function ($id) {
        $db = new Database();
        return (new CompaniesController($db))->getCompany($id);
    });

    // Route to create a new company
    $router->post('/add', function () {
        $db = new Database();
        return (new CompaniesController($db))->createCompany();
    });

    // Route to update an existing company
    $router->put('/edit/(\d+)', function ($id) {
        $db = new Database();
        return (new CompaniesController($db))->updateCompany($id);
    });

    // Route to delete a company
    $router->delete('/delete/(\d+)', function ($id) {
        $db = new Database();
        return (new CompaniesController($db))->deleteCompany($id);
    });

});

// CONTACTS

$router->mount('/contacts', function () use ($router) {

    // Route to get all contacts
    $router->get('/', function () {
        $db = new Database();
        return (new ContactsController($db))->getAllContacts();
    });

    // Route to view details of a specific contact
    $router->get('/view/(\d+)', function ($id) {
        $db = new Database();
        return (new ContactsController($db))->getContact($id);
    });

    // Route to create a new contact
    $router->post('/add', function () {
        $db = new Database();
        return (new ContactsController($db))->createContact();
    });

    // Route to update an existing contact
    $router->put('/edit/(\d+)', function ($id) {
        $db = new Database();
        return (new ContactsController($db))->updateContact($id);
    });

    // Route to delete a contact
    $router->delete('/delete/(\d+)', function ($id) {
        $db = new Database();
        return (new ContactsController($db))->deleteContact($id);
    });

});

$router->run();
