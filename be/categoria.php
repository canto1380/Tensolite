<?php
header('Access-Control-Allow-Origin: *');
include './middleware/validations.php';
include 'dbConnect.php';

DEFINE('MAX_CHAR', 50);
DEFINE('TABLE', 'categoria');
DEFINE('COLUMN', 'id');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if (isset($_GET['id'])) {
    if (existID($_GET['id'], TABLE, COLUMN) == false) {
      echo 'No se encontro ninguna categoria con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else {
      $query = "select * from categoria where id=" . $_GET['id'];
      $resultado = metodoGet($query);
      echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
      header("HTTP/1.1 200 OK");
      exit();
    }
  } else {
    $query = "select * from categoria";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());
    header("HTTP/1.1 200 OK");
    exit();
  }
}

if ($_POST['METHOD'] == 'POST') {
  unset($_POST['METHOD']);
  if (repeatName($_POST['nombre_categoria']) == false) {
    echo 'Ya existe una categoria con el nombre ingresado';
    header("HTTP/1.1 400 Bad Request");
    exit();
  } else {
    $nombre = inputLength($_POST['nombre_categoria'], MAX_CHAR);
    $query = "insert into categoria(nombre_categoria) values ('$nombre')";
    $queryAutoIncrement = "select MAX(id) as id from categoria";
    $resultado = metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 201 OK");
    exit();
    
  }
}


if ($_POST['METHOD'] == 'PUT') {
  if (isset($_POST['nombre_categoria'])) {
    unset($_POST['METHOD']);
    if (existID($_GET['id'], TABLE, COLUMN) == false) {
      echo 'No se pudo actualizar la categoria. No se encontro ningun registro con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else {
      $nombre = inputLength($_POST['nombre_categoria'], MAX_CHAR);
      $query = "update categoria set nombre_categoria='$nombre' where id=" . $_GET['id'];
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
      $query = "select deleted from categoria where id=" . $_GET['id'];
      $resultado = metodoGet($query);
      $res = json_encode($resultado->fetch(PDO::FETCH_ASSOC));
      $res_decode = json_decode($res);
      $statusDeleted = null;
      foreach ($res_decode as $fila) {
        $statusDeleted = $fila;
      }
      if ($statusDeleted === 1) {
        $query = "update categoria set deleted=0 where id=" . $_GET['id'];
        $resultado = metodoPut($query);
        echo json_encode($resultado);
        header("HTTP/1.1 200 OK");
        exit();
      } else {
        $query = "update categoria set deleted=1 where id=" . $_GET['id'];
        $resultado = metodoPut($query);
        echo json_encode($resultado);
        header("HTTP/1.1 200 OK");
        exit();
      }
    }
  }
}

header("HTTP/1.1 400 Bad Request");