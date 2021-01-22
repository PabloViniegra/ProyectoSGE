### Pasos para dockerizar el Back
>1. Crear el jar del proyecto
>~~~
>mvn clean package
>~~~
>2. Crear una imagen con este jar desde la ruta /Back con el comando 
>~~~	
>docker build -t back .
>~~~	
>3. Desde el directorio /docker usar el comando
>~~~
>docker-compose up
>~~~
>4. Abrir una conexion a la bbdd y ejecutar el .sql

Ahora siempre que queramos iniciar la API, solo tendremos que ir a la ruta /docker y usar

~~~
docker-compose up
~~~

##Pasos para Bootstrap Select
>1. Entrar en: https://developer.snapappointments.com/bootstrap-select/
>~~~
>2. Instalarlo con npm: npm install bootstrap-select
>~~~
>3. Asegurarse de tener Popper.js
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="../assets/bootstrap-4.5.3-dist/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
    <script src="../dist/js/salesConnection.js"></script>
>~~~
>4. Con eso debería funcionar, mirar docu del select live search: https://developer.snapappointments.com/bootstrap-select/examples/#live-search