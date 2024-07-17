<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once '../config/dbconnect.php';
    require_once '../controllers/ApiController.php';

    // Connection Database
    if($db = $connect){
        echo "connection DB\n";
        print_r($db);
    }
    else{
        echo "error";
    }
    
    // Create objet for Datas
    $dataController = new DataController($db);
    
    // get methods and requests and the access route
    $request_method = $_SERVER["REQUEST_METHOD"];
    $path_info = $_SERVER["PATH_INFO"] ?? '';

    // define the header response 
    header("Content-Type: application/json; cherset=UTF-8");

    // Manage different query methods
    switch($request_method){
        case "GET":
            if($path_info == '/api/datas'){
                $dataController->getAllDatasUsers();
            }
            elseif(preg_match('/\/api\/data\/(\d+)/', $path_info, $matches)){
                $dataController->getDataById($matches[1]);
            }
            case 'POST':
                if ($path_info == '/api/data') {
                    $data = json_decode(file_get_contents("php://input"), true);
                    $dataController->createPost($data);
                }
                break;
            case 'PUT':
                if (preg_match('/\/api\/data\/(\d+)/', $path_info, $matches)) {
                    $data = json_decode(file_get_contents("php://input"), true);
                    $dataController->updatePost($matches[1], $data);
                }
                break;
            case 'DELETE':
                if (preg_match('/\/api\/data\/(\d+)/', $path_info, $matches)) {
                    $dataController->deletePost($matches[1]);
                }
                break;
            default:
                header("HTTP/1.0 405 Method Not Allowed");
                echo json_encode(['status' => 405, 'message' => 'Méthode non autorisée']);
                break;
    }

