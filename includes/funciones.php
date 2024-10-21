<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

function esUltimo(string $actual, string $proximo):bool{
    if($actual !== $proximo){
        return true;
    }
    return false;
}

// funcion que revisa si el usuario este autenticado
function isAuth():void{
    if(!isset($_SESSION['login'])){
        header('Location: /');
    }
}

// Revisar si el usuario es un Admin
function isAdmin():void{
    if(!isset($_SESSION['admin'])){
        header('Location: /'); // si no esta autenticado como admin, se manda al login.
    }
}