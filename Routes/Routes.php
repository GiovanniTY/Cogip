<?php

namespace App\Routes;

use Bramus\Router\Router;
use App\Controllers\HomeController;
use App\Config\dbconnect;
use App\Controllers\CompanyController;
use App\Controllers\ContactController;

$router = new Router();

$router->get('/', function() {
    (new HomeController)->index();
});

$router->run();






