<?php

function agregar_categoria($nombre){
    include_once("./conexion.php");
    $consulta = $conexion->query("INSERT INTO categorias VALUES (NULL,'$nombre')");
    if ($consulta != NULL) {
        echo json_encode("Categoria Guardada");
    }
}
function mostrar_categoria(){
    include_once("./conexion.php");
    $consulta = $conexion->query("SELECT * FROM categorias");
    $row = $consulta->fetch_all(1);
    echo json_encode($row);
}
function eliminar_categoria($id){
    include_once("./conexion.php");
    $consulta= $conexion->query("DELETE FROM categorias WHERE id_categoria = $id");
    if ($consulta != NULL) {
        echo json_encode("Categoria eliminada");
    }
}
function producto_categoria($id){
    include_once("./conexion.php");
    $consulta = $conexion->query("SELECT id_producto, titulo, descripcion, precio, imagen, id_categoria, nombre as categoria FROM productos INNER JOIN categorias ON productos.fk_categoria = categorias.id_categoria WHERE id_categoria = $id");
    $row = $consulta->fetch_all(1);
    if ($consulta != NULL) {
        echo json_encode($row);
    }
}