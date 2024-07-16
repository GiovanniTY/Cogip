<?php

use App\Core\Router;
use App\Controllers\HomeController;
use App\Controllers\InvoicesController;
use App\Controllers\ContactController;
use App\Controllers\CompanyController;

// Include l'autoloader di Composer
require_once __DIR__ . '/../../vendor/autoload.php';

// Crea un'istanza del router
$router = new Router();

// Aggiungi le rotte per le pagine
$router->add('/', HomeController::class, 'index', 'GET');
$router->add('/invoices', InvoicesController::class, 'index', 'GET');
$router->add('/contact', ContactController::class, 'index', 'GET');
$router->add('/company', CompanyController::class, 'index', 'GET');
$router->add('/company/show/{id}', CompanyController::class, 'show', 'GET');
$router->add('/contact/show/{id}', ContactController::class, 'show', 'GET');

// Debug delle rotte
var_dump($router->getRoutes());

// Ottieni l'URI e il metodo HTTP della richiesta
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Esegui il dispatch delle rotte
$router->dispatch($uri, $method);