<?php
header('Access-Control-Allow-Origin: *');
include './middleware/validations.php';
include 'dbConnect.php';

DEFINE('MAX_CHAR_COMENT', 250);
DEFINE('TABLE', 'comentario');
DEFINE('COLUMN', 'id');
DEFINE('TABLE_MOV', 'pelicula');
DEFINE('COLUMN_MOV', 'id');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if (isset($_GET['id'])) {
    if (existID($_GET['id'], TABLE, COLUMN) == false) {
      echo 'No se encontro ningun registro con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else {
      $query = "select * from comentario where id=" . $_GET['id'];
      $resultado = metodoGet($query);
      echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
      header("HTTP/1.1 200 OK");
      exit();
    }
  } else if (isset($_GET['id_pelicula'])) {
    $query = "select * from comentario where id_pelicula=" . $_GET['id_pelicula'];
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());
    header("HTTP/1.1 200 OK");
    exit();
  } else {
    $query = "select * from comentario";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());
    header("HTTP/1.1 200 OK");
    exit();
  }
}

if ($_POST['METHOD'] == 'POST') {
  unset($_POST['METHOD']);
  if (existID($_POST['id_pelicula'], TABLE_MOV, COLUMN_MOV) == false) {
    echo 'No se encontro el id de pelicula ingresada en el comentario';
    header("HTTP/1.1 400 Bad Request");
    exit();
  } else {
    $id_pelicula = $_POST['id_pelicula'];
    $comentario = inputLength($_POST['comentario'], MAX_CHAR_COMENT);
    $query = "insert into comentario(comentario, id_pelicula) values ('$comentario', '$id_pelicula')";
    $queryAutoIncrement = "select MAX(id) as id from comentario";
    $resultado = metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 201 OK");
    exit();
  }
}

if ($_POST['METHOD'] == 'PUT') {
  if (isset($_POST['comentario'])) {
    unset($_POST['METHOD']);
    if (existID($_GET['id'], TABLE, COLUMN) == false) {
      echo 'No se pudo actualizar el comentario. No se encontro ningun registro de pelicula con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else if (existID($_POST['id_pelicula'], TABLE_MOV, COLUMN_MOV) == false) {
      echo 'No se pudo actualizar. No se encontro ninguna pelicula con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else {
      $comentario = inputLength($_POST['comentario'], MAX_CHAR_COMENT);
      $id_pelicula = $_POST['id_pelicula'];
      $query = "update comentario set comentario='$comentario', id_pelicula='$id_pelicula' where id=" . $_GET['id'];
      $resultado = metodoPut($query);
      echo json_encode($resultado);
      header("HTTP/1.1 200 OK");
      exit();
    }
  } else {
    unset($_POST['METHOD']);
    if (existID($_GET['id'], TABLE, COLUMN) == false) {
      echo 'No se pudo eliminar. No se encontro ningun comentario con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else {
      $deleteBool = 1;
      $query = "update comentario set deleted='$deleteBool' where id=" . $_GET['id'];
      $resultado = metodoPut($query);
      echo json_encode($resultado);
      header("HTTP/1.1 200 OK");
      exit();
    }
  }
}

header("HTTP/1.1 400 Bad Request");