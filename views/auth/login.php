<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Inicia sesión con tus datos</p>

<?php
include_once __DIR__ . "/../templates/alertas.php";
?>

<form action="/" class="formulario" method="post">
  <div class="campo">
    <label for="email">Email</label>
    <input type="email" name="email" id="email" placeholder="Tu Email" value="<?= s($auth->email)  ?>">
  </div>

  <div class="campo">
    <label for="password">Password</label>
    <input type="password" name="password" id="password" placeholder="Tu Password">
  </div>

  <input type="submit" value="Iniciar Sesión" class="boton">
</form>

<div class="acciones">
  <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crear una</a>
  <a href="/olvide">¿Olvidaste tu password?</a>
</div>

<div class="acceso">
  <h4>Este proyecto cuanta con dos usuarios:</h4>
  <p>
    Administrador con el correo: <span>correo2@correo.com</span> y la contraseña: <span>123456</span>. Puede crear, actualizar, leer y editar los servicios y las citas.
  </p>
  <p>
    Usuario con el correo: <span>correo3@correo.com</span> y la contraseña: <span>123456</span>. Puede crear citas.
  </p>
</div>