<?php

$db = mysqli_connect('localhost', 'root', 'contraseña', 'appsalon_mvc', '3307');


if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "errno de depuración: " . mysqli_connect_errno();
    echo "error de depuración: " . mysqli_connect_error();
    exit;
}
