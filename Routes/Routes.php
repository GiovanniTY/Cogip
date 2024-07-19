<?php

namespace App\Routes;

use Bramus\Router\Router;
use App\Config\Database;
use App\Controllers\CompaniesController;
<<<<<<< HEAD
use App\Controllers\InvoicesController;
// use App\Models\Invoices;
=======
use App\Controllers\ContactsController;

>>>>>>> dev

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

$router->mount('/invoices', function () use ($router) {

    // Route to get all invoices
    $router->get('/', function () {
        $db = new Database();
        return (new InvoicesController($db))->getAllInvoices();
    });

    // Route to view details of a specific invoice
    $router->get('/view/(\d+)', function ($id) {
        $db = new Database();
        return (new InvoicesController($db))->getInvoice($id);
    });

    // Route to create a new company
    $router->post('/add', function () {
        $db = new Database();
        return (new InvoicesController($db))->createInvoice();
    });

    // Route to update an existing invoice
    $router->put('/edit/(\d+)', function ($id) {
        $db = new Database();
        return (new InvoicesController($db))->updateInvoice($id);
    });

    // Route to delete a company
    $router->delete('/delete/(\d+)', function ($id) {
        $db = new Database();
        return (new InvoicesController($db))->deleteInvoice($id);
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
