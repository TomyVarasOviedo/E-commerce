<?php
function mostrar_carrito($user){
    include_once("./conexion.php");
    $consulta = $conexion->query("SELECT * FROM carrito INNER JOIN productos INNER JOIN categorias ON carrito.fk_producto = productos.id_producto AND productos.fk_categoria = categorias.id_categoria WHERE fk_usuario = $user");
    $row = $consulta->fetch_all(1);
    echo json_encode($row);
}
function agregar_carrito($datos){
    include_once("./conexion.php");
    $consulta = $conexion->query("INSERT INTO carrito(id_carrito, fk_usuario, fk_producto) VALUES (NULL,'$datos->id_usuario','$datos->id_producto')");
    
    echo json_encode("Datos Guardados");
    
}
function eliminar_carrito($id){
    include_once("./conexion.php");
    $consulta = $conexion->query("DELETE FROM carrito WHERE id_carrito = $id");

    echo json_encode("Producto Eliminado");
}