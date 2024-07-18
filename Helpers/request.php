<?php 
function createJson($data)
{

    try {
        $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        header('Content-Type: application/json');

        return $json;
    } catch (\Throwable $th) {
       //echo $th;
    }
}

function securityInput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function dates($format){

    $timezone = date_default_timezone_get();
    date_default_timezone_set($timezone);

    $date = date($format);
    return $date;
}