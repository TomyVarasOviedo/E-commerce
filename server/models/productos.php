<?php
function mostrar_productos() {
    include_once("./conexion.php");
    $consulta = $conexion->query("SELECT * FROM `productos`INNER JOIN categorias ON productos.fk_categoria = categorias.id_categoria");
    $row = $consulta->fetch_all(1);
    return json_encode($row);
}