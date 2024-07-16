<?php

namespace App\Core;

class Router
{
    private $routes = [];

    public function add($route, $controller, $method, $httpMethod = 'GET')
    {
        // Converti la route in una regex
        $route = preg_replace('/\{[a-zA-Z0-9]+\}/', '([a-zA-Z0-9]+)', $route);
        $this->routes[] = ['route' => $route, 'controller' => $controller, 'method' => $method, 'httpMethod' => strtoupper($httpMethod)];
    }

    public function dispatch($uri, $httpMethod)
    {
        foreach ($this->routes as $route) {
            $pattern = "@^" . $route['route'] . "$@";
            if (preg_match($pattern, $uri, $matches) && strtoupper($httpMethod) === $route['httpMethod']) {
                array_shift($matches); // Rimuove il match completo
                $controllerName = $route['controller'];
                $methodName = $route['method'];

                // Verifica se il controller e il metodo esistono
                if (class_exists($controllerName) && method_exists($controllerName, $methodName)) {
                    $controller = new $controllerName();
                    return call_user_func_array([$controller, $methodName], $matches);
                } else {
                    // Gestione dell'errore se il controller o il metodo non esistono
                    header("HTTP/1.0 500 Internal Server Error");
                    echo json_encode(["error" => "Internal Server Error"]);
                    return;
                }
            }
        }
        // Se nessuna corrispondenza di rotta viene trovata, restituisci un errore 404
        header("HTTP/1.0 404 Not Found");
        echo json_encode(["error" => "404 Not Found"]);
    }

    // Metodo per ottenere l'elenco delle rotte registrate
    public function getRoutes()
    {
        return $this->routes;
    }
}

// Debug delle rotte
$router = new Router();
$router->add('/', 'App\Controllers\HomeController', 'index', 'GET');
$router->add('/invoices', 'App\Controllers\InvoicesController', 'index', 'GET');
$router->add('/contact', 'App\Controllers\ContactController', 'index', 'GET');
$router->add('/company', 'App\Controllers\CompanyController', 'index', 'GET');
$router->add('/company/show/{id}', 'App\Controllers\CompanyController', 'show', 'GET');
$router->add('/contact/show/{id}', 'App\Controllers\ContactController', 'show', 'GET');

var_dump($router->getRoutes());

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$router->dispatch($uri, $method);
