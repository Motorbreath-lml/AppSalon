# Seccion 46: AppSalon - Proyecto en MVC, PHP 8, MySQL, SASS y Gulp
Este proyecto lo empece el 21/09/2024, las dependencias del **package.json** estan actualizados hasta este momento, las dependencias se instalan con el comando `npm install`. Para que gulp funcione se ejecuta con el comando `npm run dev` Gulp ayuda a compilar JS y CSS, ademas de comprimir y convertir de formato las imagenes, las dependencias del package.json son solo para desarrollo, no deverian de ir en produccion, ya que no son necesarias.

Recordar que los cambios de JS, CSS e imagenes se hacen en la carpeta de *src* y se compilan con gulp mediante el gulpfile, las dependencias, el comando en el package.json que es `npm run dev`.

Con el comando `composer init` se incia el proyecto con php lo que interesa aqui es el uso del psr4 en el composer.js, este psr4 se crea de manera manual, para definir los namespace del proyecto. Despues de modificar el **composer.json** hay que ejecutar el comando `composer update` para que el autoload se actualice con los nuevos namespaces.

