<?php
header('Access-Control-Allow-Origin: *');
include './middleware/validations.php';
include 'dbConnect.php';

DEFINE('MAX_CHAR_NAME', 50);
DEFINE('MAX_CHAR_DESCRIP', 200);
DEFINE('TABLE', 'pelicula');
DEFINE('COLUMN', 'id');
DEFINE('TABLE_CAT', 'categoria');
DEFINE('COLUMN_CAT', 'id');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if (isset($_GET['id'])) {
    if (existID($_GET['id'], TABLE, COLUMN) == false) {
      echo 'No se encontro ninguna pelicula con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else {
      $query = "select p.id, p.nombre_pelicula, p.descip_pelicula, p.anio_estreno, c.nombre_categoria, p.deleted from pelicula As p, categoria AS c where p.id_categoria = c.id AND p.id=" . $_GET['id'];
      $resultado = metodoGet($query);
      echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }
  } else {
    $query = "select * from pelicula";
    $query = 'select p.id, p.nombre_pelicula, p.descip_pelicula, p.anio_estreno, c.nombre_categoria, p.deleted from pelicula As p, categoria AS c where p.id_categoria = c.id';
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());
  }
  exit();
}

if ($_POST['METHOD'] == 'POST') {
  unset($_POST['METHOD']);
  $id_categoria = $_POST['id_categoria'];
  if (existID($id_categoria, TABLE_CAT, COLUMN_CAT) == false) {
    echo 'No se encontro la categoria ingresada en la pelicula';
    header("HTTP/1.1 400 Bad Request");
    exit();
  } else {
    $descripcion = inputLength($_POST['descrip_pelicula'], MAX_CHAR_DESCRIP);
    $nombre = inputLength($_POST['nombre_pelicula'], MAX_CHAR_NAME);
    $anio_estreno = ($_POST['anio_estreno']);
    $query = "insert into pelicula(nombre_pelicula, descip_pelicula, id_categoria, anio_estreno) values ('$nombre', '$descripcion', '$id_categoria', '$anio_estreno')";
    $queryAutoIncrement = "select MAX(id) as id from pelicula";
    $resultado = metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 201 OK");
    exit();
  }
}

if ($_POST['METHOD'] == 'PUT') {
  if (isset($_POST['nombre_pelicula'])) {
    unset($_POST['METHOD']);
    if (existID($_GET['id'], TABLE, COLUMN) == false) {
      echo 'No se pudo actualizar la pelicula. No se encontro ningun registro con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else if (existID($_POST['id_categoria'], TABLE_CAT, COLUMN_CAT) == false) {
      echo 'No se pudo actualizar la pelicula. No se encontro ninguna categoria con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else {
      $nombre = inputLength($_POST['nombre_pelicula'], MAX_CHAR_NAME);
      $descripcion = inputLength($_POST['descrip_pelicula'], MAX_CHAR_DESCRIP);
      $id_categoria = $_POST['id_categoria'];
      $anio_estreno = $_POST['anio_estreno'];
      $query = "update pelicula set nombre_pelicula='$nombre', descip_pelicula='$descripcion', anio_estreno='$anio_estreno', id_categoria='$id_categoria' where id=" . $_GET['id'];
      $resultado = metodoPut($query);
      echo json_encode($resultado);
      header("HTTP/1.1 200 OK");
      exit();
    }
  } else {
    unset($_POST['METHOD']);
    if (existID($_GET['id'], TABLE, COLUMN) == false) {
      echo 'No se pudo eliminar. No se encontro ningun registro con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else {
      $query = "select deleted from pelicula where id=" . $_GET['id'];
      $resultado = metodoGet($query);
      $res = json_encode($resultado->fetch(PDO::FETCH_ASSOC));
      $res_decode = json_decode($res);
      $statusDeleted = null;
      foreach ($res_decode as $fila) {
        $statusDeleted = $fila;
      }
      if ($statusDeleted === 1) {
        $query = "update pelicula set deleted=0 where id=" . $_GET['id'];
        $resultado = metodoPut($query);
        echo json_encode($resultado);
        header("HTTP/1.1 200 OK");
        exit();
      } else {
        $query = "update pelicula set deleted=1 where id=" . $_GET['id'];
        $resultado = metodoPut($query);
        echo json_encode($resultado);
        header("HTTP/1.1 200 OK");
        exit();
      }
    }
  }
}

header("HTTP/1.1 400 Bad Request");