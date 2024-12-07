<?php

namespace Model;

use JsonSerializable;

class Servicio extends ActiveRecord implements JsonSerializable
{
  // Base de Datos
  protected static $tabla = 'servicios';
  protected static $columnasDB = ['id', 'nombre', 'precio'];

  public $id;
  public $nombre;
  public $precio;

  public function __construct($args = [])
  {
    $this->id = $args['id'] ?? null;
    $this->nombre = $args['nombre'] ?? '';
    $this->precio = $args['precio'] ?? '';
  }

  public function validar()
  {
    if (!$this->nombre) {
      self::$alertas['error'][] = 'El nombre del Servicio es Obligatorio';
    }

    if (!$this->precio) {
      self::$alertas['error'][] = 'El precio del Servicio es Obligatorio';
    } elseif (!is_numeric($this->precio)) {
      self::$alertas['error'][] = 'El precio del Servicio no es valido';
    }

    return self::$alertas;
  }

  // Implementación de jsonSerialize
  public function jsonSerialize()
  {
    return [
      'id' => $this->id,
      'nombre' => $this->nombre,
      'precio' => $this->precio,
    ];
  }
}
