<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;

class APIController{
  public static function index(){
    // Consulta de todos los servicios
    $servicios = Servicio::all();

    // Asegúrate de limpiar el buffer de salida antes de enviar el JSON
    if (ob_get_length()) {
      ob_clean();
    }

     // Decir que mandamos un JSON
     header('Content-Type: application/json');

    // Convertir el arreglo a un JSON     
    $json_data=json_encode($servicios);

    // Revisar si el JSon se puedo decodificar
    if ($json_data === false) { 
        echo 'Error al codificar JSON: ' . json_last_error_msg(); 
    } else { 
        echo $json_data; 
    }
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

  public static function eliminar(){
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
      $id = $_POST['id'];
      $cita = Cita::find($id);
      $cita->eliminar();
      // Redirige a la pagina que hizo la peticion.
      header('Location:'.$_SERVER['HTTP_REFERER']);
    }
  }
}