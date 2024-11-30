<h1 class="nombre-pagina">Panel de Administración</h1>

<?php
include_once __DIR__ . '/../templates/barra.php';
?>
<h2>Buscar Citas</h2>
<div class="busqueda">
  <form action="" class="formulario">
    <div class="campo">
      <label for="fecha">Fecha</label>
      <input
        type="date"
        id="fecha"
        name="fecha"
        value="<?= $fecha ?>">
    </div>
  </form>
</div>

<?php
if (count($citas) === 0) {
  echo "<h2>No hay Citas en esta fecha</h2>";
}
?>

<div class="citas-admin">
  <ul class="citas">
    <?php
    $idCita = -1;
    foreach ($citas as $key => $cita):
      if ($idCita !== $cita->id):
        $total = 0;
    ?>
        <li>
          <p>ID: <span><?= $cita->id ?></span></p>
          <p>Hora: <span><?= $cita->hora ?></span></p>
          <p>Cliente: <span><?= $cita->cliente ?></span></p>
          <p>Email: <span><?= $cita->email ?></span></p>
          <p>Telefono: <span><?= $cita->telefono ?></span></p>
        </li>

        <h3>Servicios</h3>
      <?php
      endif;
      $idCita = $cita->id;
      // debuguear($cita->servicio);
      if (is_null($cita->servicio)):
      ?>
        <p class="servicio">
          No hay servicios
        </p>
        <form action="/api/eliminar" method="post">
          <input type="hidden" name="id" value="<?= $cita->id ?? '' ?>">
          <input type="submit" value="Eliminar Cita" class="boton-eliminar">
        </form>
      <?php
      else:
      ?>
        <p class="servicio">
          <?= $cita->servicio . ": " . $cita->precio  ?>
        </p>
        <?php
        $total += $cita->precio;
        $actual = $cita->id;
        $proximo = $citas[$key + 1]->id ?? 0;

        if (esUltimo($actual, $proximo)):
        ?>
          <p class="total">Total: <span>$ <?= $total ?></span></p>
          <form action="/api/eliminar" method="post">
            <input type="hidden" name="id" value="<?= $cita->id ?? '' ?>">
            <input type="submit" value="Eliminar Cita" class="boton-eliminar">
          </form>
    <?php
        endif;
      endif;
    endforeach;
    ?>
  </ul>
</div>

<?php
$script = "<script src='public/build/js/buscador.js'></script>"
?>