<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email{
  public $email;
  public $nombre;
  public $token;

  public function __construct($nombre, $email, $token)
  {
    $this->email = $email;
    $this->nombre = $nombre;
    $this->token = $token;
  }
 
  public function enviarConfirmacion(){
    // Crear una nueva instacia de PHPMailer()
    $phpmailer = new PHPMailer();

    // Configurar PHPMailer - el codigo me lo dio directamente mailtrap
    $phpmailer->isSMTP();
    $phpmailer->Host = 'sandbox.smtp.mailtrap.io';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 2525;
    $phpmailer->Username = $_ENV['MT_USERNAME'];  
    $phpmailer->Password = $_ENV['MT_PASSWORD'];
    $phpmailer->SMTPSecure='tls'; //Mailtrap dice que esta parte es opcional que el cifrado TLS existe en todos los puertos

    // Configurar el contenido del mail
    $phpmailer->setFrom('usuario@dominio.com');
    $phpmailer->addAddress('admin@appsalon.com', 'appsalon.com');
    $phpmailer->Subject='Confrimar cuenta';

    // Habilitar HTML
    $phpmailer->isHTML(true);
    $phpmailer->CharSet = 'UTF-8';

    // Definir el contenido
    $contenido = '<html>' ;
    $contenido .= '<p> Tienes un nuevo mensaje. </p>';
    $contenido .= "<p> Hola <strong>" . $this->nombre . "</strong></p>";
    $contenido .= "<p> Has creado tu cuenta en App Salón solo debes confirmar presionando el siguiente enlace.  </p>";
    $contenido .= "<p> <a href='http://localhost:3000/confirmar-cuenta?token=$this->token'>Confirmar cuenta</a> </p>";
    $contenido .= "<p> Si tu solicitaste este cambio, puedes ignorar el mensaje </p>";
    $contenido.= "</html>";
    $phpmailer->Body=$contenido;

    // Enviar el email
    if($phpmailer->send()){
      // echo 'Mensaje enviado correctamente';
    }else{
      // echo 'El mensaje no se pudo enviar';
    }
  }

  public function enviarInstrucciones(){
    // Crear una nueva instacia de PHPMailer()
    $phpmailer = new PHPMailer();

    // Configurar PHPMailer - el codigo me lo dio directamente mailtrap
    $phpmailer->isSMTP();
    $phpmailer->Host = 'sandbox.smtp.mailtrap.io';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 2525;
    $phpmailer->Username = 'a9236873bf6a11';
    $phpmailer->Password = 'dff26ea5ab0f2b';
    $phpmailer->SMTPSecure='tls'; //Mailtrap dice que esta parte es opcional que el cifrado TLS existe en todos los puertos

    // Configurar el contenido del mail
    $phpmailer->setFrom('usuario@dominio.com');
    $phpmailer->addAddress('admin@appsalon.com', 'appsalon.com');
    $phpmailer->Subject='Reestablecer tu password';

    // Habilitar HTML
    $phpmailer->isHTML(true);
    $phpmailer->CharSet = 'UTF-8';

    // Definir el contenido
    $contenido = '<html>' ;
    $contenido .= '<p> Tienes un nuevo mensaje. </p>';
    $contenido .= "<p> Hola <strong>" . $this->nombre . "</strong></p>";
    $contenido .= "<p> Has solicitado reestablecer tu password, sigue el siguiente enlace para hacerlo. </p>";
    $contenido .= "<p> <a href='http://localhost:3000/recuperar?token=$this->token'>Reestablecer password</a> </p>";
    $contenido .= "<p> Si tu solicitaste este cambio, puedes ignorar el mensaje </p>";
    $contenido.= "</html>";
    $phpmailer->Body=$contenido;

    // Enviar el email
    if($phpmailer->send()){
      // echo 'Mensaje enviado correctamente';
    }else{
      // echo 'El mensaje no se pudo enviar';
    }
  }
}