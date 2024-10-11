<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\servicio;

class APIController{
  public static function index(){
    // Consulta de todos los servicios
    $servicios = servicio::all();
    // Mandar como un JSON todo el arreglo de los servicios
    echo json_encode($servicios);
  }

  public static function guardar(){

    // Almacena la Cita y devulve el Id
    $cita = new Cita($_POST);
    $resultado = $cita->guardar();

    // Obtener el id de la cita una vez que se registro
    $id = $resultado['id'];

    // Almacena el id de la cita y los servicios
    $idServicios = explode(",", $_POST['servicios']);

    foreach($idServicios as $idServicio){
      $args = [
        'citaId' => $id,
        'servicioId' => $idServicio
      ];
      $citaServicio = new CitaServicio($args); // Crea un citaServicio y se guarda
      $citaServicio->guardar();
    }

    $respuesta=[
      'resultado' => $resultado
    ];

    echo json_encode($respuesta);
  }
}