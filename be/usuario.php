<?php
header('Access-Control-Allow-Origin: *');

include './middleware/validations.php';
include 'dbConnect.php';

DEFINE('MAX_CHAR', 50);
DEFINE('MAX_CHAR_PASS', 200);
DEFINE('TABLE', 'usuario');
DEFINE('COLUMN', 'id');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if (isset($_GET['id'])) {
    if (existID($_GET['id'], TABLE, COLUMN) == false) {
      echo 'No se encontro ningun usuario con el Id ingresado';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else {
      $query = "select * from usuario where id=" . $_GET['id'];
      $resultado = metodoGet($query);
      echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
      header("HTTP/1.1 200 OK");
      exit();
    }
  } else {
    $query = "select * from usuario";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());
    header("HTTP/1.1 200 OK");
    exit();
  }
}

if ($_POST['METHOD'] == 'POST') {
  unset($_POST['METHOD']);
  if (isset($_POST['nombre']) && isset($_POST['apellido'])) {
    $nombre = inputLength($_POST['nombre'], MAX_CHAR);
    $apellido = inputLength($_POST['apellido'], MAX_CHAR);
    $email = inputLength($_POST['email'], MAX_CHAR);
    $clave = inputLength($_POST['clave'], MAX_CHAR_PASS);
    $clave_encrip = password_hash($clave, PASSWORD_BCRYPT);
    $query = "insert into usuario(nombre, apellido, email, clave) values ('$nombre', '$apellido', '$email', '$clave')";
    $queryAutoIncrement = "select MAX(id) as id from usuario";
    $resultado = metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 201 OK");
    exit();
  } else {
    $email = inputLength($_POST['email'], MAX_CHAR);
    $clave = inputLength($_POST['clave'], MAX_CHAR_PASS);
    if (verifyLogin($email, $clave) === false) {
      echo 'Error en la contrasena ingresada. Intente nuevamente';
      header("HTTP/1.1 400 Bad Request");
      exit();
    } else {
      $response = array('email' => $email, 'clave' => $clave);
      echo json_encode($response);
      header("HTTP/1.1 200 OK");
      exit();
    }
    // exit();
  }
}



header("HTTP/1.1 400 Bad Request");