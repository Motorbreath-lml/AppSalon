<?php

namespace Controllers;

use Model\servicio;

class APIController{
  public static function index(){
    // Consulta de todos los servicios
    $servicios = servicio::all();
    // Mandar como un JSON todo el arreglo de los servicios
    echo json_encode($servicios);
  }
}