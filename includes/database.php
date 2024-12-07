<?php
$db_host = $_ENV['DB_HOST'];
$db_database = $_ENV['DB_DATABASE'];
$db_user = $_ENV['DB_USERNAME'];
$db_password = $_ENV['DB_PASSWORD'];
$db_port = $_ENV['DB_PORT'];

$db = mysqli_connect($db_host, $db_user, $db_password, $db_database, $db_port);
// Forzar codificación UTF-8 al conectar con la base de datos
$db->set_charset('utf8mb4');


if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "errno de depuración: " . mysqli_connect_errno();
    echo "error de depuración: " . mysqli_connect_error();
    exit;
}
