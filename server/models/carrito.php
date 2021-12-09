<?php
function mostrar_carrito($user){
    include_once("./conexion.php");
    $consulta = $conexion->query("SELECT * FROM carrito INNER JOIN productos INNER JOIN categorias ON carrito.fk_producto = productos.id_producto AND productos.fk_categoria = categorias.id_categoria WHERE fk_usuario = $user");
    $row = $consulta->fetch_all(1);
    echo json_encode($row);
}