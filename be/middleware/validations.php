<?php

function global_input($data)
{
  $data = trim($data);
  $data = stripcslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function inputLength($data, $maxLength)
{
  if (empty($data)) {
    echo 'No puede ser null';
    header("HTTP/1.1 400 Not Found");
    exit();
  } else if (strlen($data) > $maxLength) {
    echo 'No puede ser mayor a ', $maxLength, ' caracteres';
    header("HTTP/1.1 400 Not Found");
    exit();
  } else {
    return global_input($data);
    // return repeatName($data);
  }
}

function existID($data, $table, $column)
{
  $query = "select * from $table where $column=$data";
  $resultado = metodoGet($query);
  $res = json_encode($resultado->fetchAll());
  $res_decode = json_decode($res);
  $response = empty($res_decode);
  if ($response == 1) {
    return false;
  } else {
    return true;
  }
}

function verifyLogin($email, $clave)
{
  $query = "select email, clave from usuario where email='$email'";
  $resultado = metodoGet($query);
  $res = json_encode($resultado->fetchAll());
  $res_decode = json_decode($res);
  $response = empty($res_decode);
  if ($response == 1) {
    echo 'Error en el mail ingresado. No esta registrado.';
    header("HTTP/1.1 400 OK");
      exit();
  } else {
    $clave_query = null;
    foreach ($res_decode as $fila) {
      $clave_query = $fila->clave;
    }
    // if(password_verify($clave, $clave_query)) {
    //   echo 'contrasena valida';
    // } else {
    //   echo 'contrasena no valida';
    // }
    if ($clave === $clave_query) {
      return true;
    } else {
      return false;
    }
  }
}

function repeatName($data)
{
  $query = "select nombre_categoria from categoria where nombre_categoria='$data'";
  $resultado = metodoGet($query);
  $res = json_encode($resultado->fetchAll());
  $res_decode = json_decode($res);
  $response = empty($res_decode);
  if($response == 1) {
    return true;
  } else {
    return false;
    
  }
}