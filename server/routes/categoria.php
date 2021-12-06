<?php
router("POST", "/agregar-categoria", function (){
   include_once("./models/categoria.php");
   $nombre = $_POST['nombre'];
   if (empty($nombre)) {
       exit(); 
   }else{
       echo agregar_categoria($nombre);
   }
});
router("GET", "/categorias", function (){
    include_once("./models/categoria.php");
    echo mostrar_categoria();
});
router("GET", "/eliminar-categoria/:id", function ($id){
   include_once("./models/categoria.php");
   echo eliminar_categoria($id); 
});
router("GET", "/producto-categoria/:id", function ($id){
   include_once("./models/categoria.php");
   echo producto_categoria($id); 
});