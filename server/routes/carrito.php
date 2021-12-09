<?php
router("GET", "/carrito/:user", function ($user){
   include_once("./models/carrito.php");
   echo mostrar_carrito($user);
});