<?php
router("GET", "/carrito/:user", function ($user){
   include_once("./models/carrito.php");
   echo mostrar_carrito($user);
});
router("POST", "/carrito-agregar",function (){
    include_once("./models/carrito.php");
    $datos = new stdClass();
    $datos->id_usuario = $_POST['usuario'];
    $datos->id_producto = $_POST['producto'];

    echo agregar_carrito($datos);
});
router("GET", "/carrito-eliminar/:id", function ($id){
    include_once("./models/carrito.php");

    echo eliminar_carrito($id);
});