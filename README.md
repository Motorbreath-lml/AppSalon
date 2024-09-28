# Seccion 46: AppSalon - Proyecto en MVC, PHP 8, MySQL, SASS y Gulp
Este proyecto lo empece el 21/09/2024, las dependencias del **package.json** estan actualizados hasta este momento, las dependencias se instalan con el comando `npm install`. Para que gulp funcione se ejecuta con el comando `npm run dev` Gulp ayuda a compilar JS y CSS, ademas de comprimir y convertir de formato las imagenes, las dependencias del package.json son solo para desarrollo, no deverian de ir en produccion, ya que no son necesarias.

Recordar que los cambios de JS, CSS e imagenes se hacen en la carpeta de *src* y se compilan con gulp mediante el gulpfile, las dependencias, el comando en el package.json que es `npm run dev`.

Con el comando `composer init` se incia el proyecto con php lo que interesa aqui es el uso del psr4 en el composer.js, este psr4 se crea de manera manual, para definir los namespace del proyecto. Despues de modificar el **composer.json** hay que ejecutar el comando `composer update` para que el autoload se actualice con los nuevos namespaces.

Para validar el usuario, se generada un token que se enviaran via email, con phpMailer y Mailtrap, en este proyecto se creo un nuevo namespace llamado Classes, su ubicacion es en `.classes` el objetivo de este namespace es generar clases que ayuden con la logica de negocio, hasta el momento seria la Clase Email.php la encargada de mandar los email.

El usuario recibira un correo con la liga hacia validar su usuario, esta liga tiene el token en la URL, cuando se dirija adicha liga, eutomaticamente el sistema buscar un usuario por su token si este existe validara al usuario en caso contrario marcara error, si es valido en la base de datos se borrada el token y se indicara en el registro que el uario asido validado.



## password_hash() por chatGPT.
La función `password_hash()` en PHP es utilizada para **encriptar o "hashear" contraseñas** de forma segura, utilizando algoritmos de encriptación que protegen los datos de contraseñas sensibles antes de almacenarlas en una base de datos. En el código que has proporcionado, la función `hashPassword()` está usando este método para **hashear** el valor de la contraseña.

### Desglose del código:

```php
public function hashPassword(){
    $this->password = password_hash($this->password, PASSWORD_BCRYPT);
}
```

#### Explicación de lo que hace:

1. **`$this->password`**: 
   - Este es el **atributo** del objeto que contiene la contraseña original (probablemente introducida por el usuario).

2. **`password_hash()`**: 
   - Esta función es parte de las funciones de seguridad de PHP diseñadas para encriptar contraseñas.
   - El primer argumento es la contraseña que se va a hashear (en este caso, `$this->password`).
   - El segundo argumento es el **algoritmo de encriptación** que se usará. En este caso, se usa `PASSWORD_BCRYPT`.

3. **`PASSWORD_BCRYPT`**:
   - Este es un algoritmo de encriptación que implementa **Blowfish**. Es uno de los algoritmos más seguros para contraseñas y, por defecto, genera un **hash de 60 caracteres**.
   - Bcrypt añade un **salt** (valor aleatorio) automáticamente al proceso, lo que hace que incluso si dos usuarios tienen la misma contraseña, los valores hasheados serán diferentes, mejorando la seguridad.

4. **Resultado**: 
   - Después de ejecutar `password_hash()`, el atributo `$this->password` se convierte en el **hash de la contraseña** (no es la contraseña original). Este hash puede ser almacenado en la base de datos de manera segura.
   - Por ejemplo, si la contraseña original es "password123", después de hashearla, `$this->password` podría parecerse a algo como: `$2y$10$EwexvO8hx83sLmefH7HOxOJcLmnzdiMqOUKzEhLnGfASyEZk6xE5S` (un hash largo y único).

### ¿Por qué se usa `password_hash()`?

1. **Seguridad**:
   - **Las contraseñas nunca deben almacenarse en texto plano (sin encriptar)** en una base de datos. Si alguien accede a la base de datos, podría ver todas las contraseñas si están en texto plano.
   - Al usar `password_hash()`, se asegura que las contraseñas estén encriptadas, y ni siquiera los administradores del sistema podrían leerlas.

2. **Salting**:
   - La función `password_hash()` genera automáticamente un **salt** para cada contraseña. El salt es un valor aleatorio que se incluye en el hash para que incluso si dos contraseñas son iguales, los hashes generados sean diferentes.

3. **Algoritmos seguros**:
   - Bcrypt, el algoritmo usado aquí, es resistente a muchos ataques de fuerza bruta, haciéndolo una buena opción para proteger contraseñas.

### Ejemplo de uso más amplio:

Supongamos que tienes un formulario de registro donde el usuario introduce una contraseña. Al registrar al usuario en la base de datos, hasheas la contraseña usando esta función para que nunca se guarde en texto plano:

```php
$user_password = "password123"; // Contraseña introducida por el usuario

// Hasheando la contraseña antes de guardarla
$hashed_password = password_hash($user_password, PASSWORD_BCRYPT);

// Guardar $hashed_password en la base de datos
```

Cuando el usuario intente iniciar sesión en el futuro, no compararás la contraseña en texto plano con la almacenada, sino que usarás `password_verify()` para verificar si la contraseña proporcionada coincide con el hash almacenado en la base de datos.

### Conclusión:

La función `password_hash()` es la forma recomendada de **encriptar contraseñas** en PHP. En tu código, lo que hace es generar un hash seguro de la contraseña utilizando el algoritmo Bcrypt y luego asigna ese hash a `$this->password`. Esto es importante porque **hashear contraseñas** es una de las mejores prácticas de seguridad en el desarrollo web.

## uniqid() por chatGPT
La función `uniqid()` en PHP se utiliza para generar un **ID único** basado en el tiempo actual en microsegundos. Es una manera rápida de generar un identificador que, en la mayoría de los casos, será único.

### Explicación de `uniqid()`:

1. **`uniqid()` sin parámetros**:
   - Cuando se usa sin parámetros, como en tu ejemplo (`uniqid()`), genera un string basado en el tiempo actual medido en microsegundos. El valor generado es único para cada llamada a la función, ya que el tiempo continúa avanzando.
   - Esto produce un **identificador único de 13 caracteres**, que es suficiente para la mayoría de los casos simples donde se necesita un identificador.

2. **Uso en tu código:**

```php
public function crearToken()
{
    $this->token = uniqid();
}
```

#### ¿Qué hace este código?

- **`$this->token`**: 
   - Es una propiedad del objeto que almacenará el valor generado por `uniqid()`.
   
- **`uniqid()`**:
   - Genera un **ID único** y lo asigna a la propiedad `token`.
   
- **Propósito**:
   - Esta función (`crearToken()`) genera un **token único** que puede ser utilizado como un identificador temporal. Es útil para situaciones donde necesitas un identificador que probablemente no se repita, como tokens de autenticación, identificadores de transacciones, etc.

### Ejemplo de lo que genera `uniqid()`:

```php
$token = uniqid();
echo $token;
```

Podría generar algo como:

```
651f233a3db71
```

Cada vez que ejecutes la función, producirá un valor diferente porque está basado en la marca de tiempo actual en microsegundos.

### `uniqid()` con parámetros:

Si necesitas una mayor **entropía** o más aleatoriedad (por ejemplo, para mayor seguridad o evitar colisiones en escenarios con muchas llamadas simultáneas), puedes utilizar `uniqid()` con sus parámetros opcionales.

1. **`uniqid(prefix, more_entropy)`**:
   - **`prefix`**: Puedes pasar un string que será añadido al inicio del ID generado, útil para distinguir entre diferentes tipos de tokens o identificadores.
   - **`more_entropy`**: Si se pasa `true` como segundo parámetro, se genera un ID más largo con más entropía, lo que lo hace menos probable de colisionar en aplicaciones de alto tráfico o sistemas distribuidos.

   Ejemplo:

   ```php
   $token = uniqid('token_', true);
   echo $token;
   ```

   Esto podría generar algo como:

   ```
   token_651f235f0bf3e6.78967409
   ```

   Aquí, el identificador es más largo y con más entropía, lo que lo hace aún más único.

### Usos comunes de `uniqid()`:

- **Generación de tokens** para procesos de autenticación o verificación.
- **Nombres de archivos únicos**: Si necesitas generar nombres de archivos que no colisionen (ej: al guardar imágenes subidas por los usuarios).
- **ID temporales** en bases de datos o sistemas que requieren un identificador único pero no usan un campo de tipo `AUTO_INCREMENT`.

### Consideraciones:

- **No es criptográficamente seguro**: Si necesitas generar tokens de alta seguridad para propósitos críticos (como contraseñas, tokens de sesión o tokens para el restablecimiento de contraseñas), es preferible usar funciones más robustas como `bin2hex(random_bytes(16))`, que proporciona un mayor nivel de seguridad criptográfica.
  
### Conclusión:

En tu código, la función `crearToken()` está utilizando `uniqid()` para generar un **token único** basado en la marca de tiempo actual en microsegundos, que luego se asigna a la propiedad `$this->token`. Esto es útil para crear identificadores únicos rápidamente, como tokens de autenticación o IDs únicos para otros propósitos, aunque no es recomendable para casos donde la seguridad es crítica debido a la falta de entropía criptográfica.
