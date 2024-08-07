<?php

namespace App\Routes;

use Bramus\Router\Router;
use App\Config\Database;
use App\Controllers\CompaniesController;
use App\Controllers\InvoicesController;
use App\Controllers\ContactsController;
use App\Controllers\UsersController;
use App\Controllers\LoginController;

$router = new Router();

// Companies Routes
$router->mount('/companies', function () use ($router) {
    $router->get('/', function () {
        $db = new Database();
        return (new CompaniesController($db))->getAllCompanies();
    });

    $router->get('/view/(\d+)', function ($id) {
        $db = new Database();
        return (new CompaniesController($db))->getCompany($id);
    });

    $router->post('/add', function () {
        $db = new Database();
        return (new CompaniesController($db))->createCompany();
    });

    $router->put('/edit/(\d+)', function ($id) {
        $db = new Database();
        return (new CompaniesController($db))->updateCompany($id);
    });

    $router->delete('/delete/(\d+)', function ($id) {
        $db = new Database();
        return (new CompaniesController($db))->deleteCompany($id);
    });
});

// Invoices Routes
$router->mount('/invoices', function () use ($router) {
    $router->get('/', function () {
        $db = new Database();
        return (new InvoicesController($db))->getAllInvoices();
    });

    $router->get('/company/(\d+)', function ($id) {
        $db = new Database();
        return (new InvoicesController($db))->getAllCompanyInvoices($id);
    });

    $router->get('/view/(\d+)', function ($id) {
        $db = new Database();
        return (new InvoicesController($db))->getInvoice($id);
    });

    $router->post('/add', function () {
        $db = new Database();
        return (new InvoicesController($db))->createInvoice();
    });

    $router->put('/edit/(\d+)', function ($id) {
        $db = new Database();
        return (new InvoicesController($db))->updateInvoice($id);
    });

    $router->delete('/delete/(\d+)', function ($id) {
        $db = new Database();
        return (new InvoicesController($db))->deleteInvoice($id);
    });
});

// Contacts Routes
$router->mount('/contacts', function () use ($router) {
    $router->get('/', function () {
        $db = new Database();
        return (new ContactsController($db))->getAllContacts();
    });

    $router->get('/view/(\d+)', function ($id) {
        $db = new Database();
        return (new ContactsController($db))->getContact($id);
    });

    $router->get('/company/(\d+)', function ($id) {
        $db = new Database();
        return (new ContactsController($db))->getAllCompanyContact($id);
    });

    $router->post('/add', function () {
        $db = new Database();
        return (new ContactsController($db))->createContact();
    });

    $router->put('/edit/(\d+)', function ($id) {
        $db = new Database();
        return (new ContactsController($db))->updateContact($id);
    });

    $router->delete('/delete/(\d+)', function ($id) {
        $db = new Database();
        return (new ContactsController($db))->deleteContact($id);
    });
});

// Users Routes
$router->mount('/users', function () use ($router) {
    $router->get('/', function () {
        $db = new Database();
        return (new UsersController($db))->getAllUsers();
    });

    $router->post('/add', function () {
        $db = new Database();
        return (new UsersController($db))->createUser();
    });

    $router->put('/edit/(\d+)', function ($id) {
        $db = new Database();
        return (new UsersController($db))->updateUser($id);
    });

    $router->delete('/delete/(\d+)', function ($id) {
        $db = new Database();
        return (new UsersController($db))->deleteUser($id);
    });
});

// Login Route
$router->post('/login', function () {
    $db = new Database();
    return (new LoginController($db))->login();
});

// Logout Route
$router->post('/logout/(\w+)', function ($key) {
    $db = new Database();
    return (new LoginController($db))->logout($key);
});

$router->run();
