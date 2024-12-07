<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Salón</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/build/css/app.css">

    <!-- Favicon para navegadores comunes -->
    <link rel="shortcut icon" href="/public/build/img/favicon_io/favicon.ico" type="image/x-icon">

    <link rel="icon" href="/public/build/img/favicon_io/favicon-16x16.png" type="image/png">

    <link rel="icon" href="/public/build/img/favicon_io/favicon-32x32.png" type="image/png">

    <!-- Favicon para dispositivos Apple (iPhone, iPad) -->
    <link rel="apple-touch-icon" sizes="180x180" href="/public/build/img/favicon_io/apple-touch-icon.png">

    <!-- Favicon para Android Chrome -->
    <link rel="icon" sizes="192x192" href="/public/build/img/favicon_io/android-chrome-192x192.png">
    <link rel="icon" sizes="512x512" href="/public/build/img/favicon_io/android-chrome-512x512.png">
</head>

<body>
    <div class="contenedor-app">
        <div class="imagen"></div>
        <div class="app">
            <?php echo $contenido; ?>
        </div>
    </div>

    <?php
    echo $script ?? '';
    ?>
</body>

</html>