import React, { useState } from "react";
import { Button, Form, Spinner, Container, Row, Col } from "react-bootstrap";
import MsjError from "../../utils/Messages/MsjError";
import { Link } from "react-router-dom";
import axios from "axios";
import { setToken } from "../../helpers/helpers";
import { validaClave, validaEmail } from "../../utils/validations/validation";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: "",
    clave: "",
  });
  const [data, setData] = useState([]);
  const [dataError, setDataError] = useState("");
  const [errorValid, setErrorValid] = useState(false);

  const handleValores = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const baseURL = `${process.env.REACT_APP_API_URL}/usuario.php/`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validaEmail(userLogin.email) && validaClave(userLogin.clave)) {
      login(e);
    } else {
      setErrorValid(true);
      setTimeout(() => {
        setErrorValid(false);
      }, 3000);
    }
  };
  const login = async (e) => {
    e.preventDefault();
    const f = new FormData();
    f.append("email", userLogin.email);
    f.append("clave", userLogin.clave);
    f.append("METHOD", "POST");

    await axios
      .post(baseURL, f)
      .then((response) => {
        setToken(response?.data);
        setLoading(true);
        setTimeout(() => {
          window.location.href = "/";
          setLoading(false);
        }, 3000);
      })
      .catch((error) => {
        setData(error.response.data);
        setDataError(true);
        setTimeout(() => {
          setDataError("");
        }, 3000);
      });
  };

  return (

    <Container className="py-5 my-3">
      <div className="">
        <h1 className="text-center display-4 mt-4 mb-3">Movie Shop</h1>
      </div>
      <hr />
      <Row className="mt-5 d-flex justify-content-around">
        <Col sm={12} lg={4}>
          <h4 className="text-center">
            <span className=" pb-3 px-3">
              <b>Ingrese a su cuenta</b>
            </span>
          </h4>
          <div>
            <Form
              className="my-4 border border-1 rounded p-4"
              onSubmit={handleSubmit}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoComplete="username"
                  minLength="15"
                  maxLength="40"
                  type="email"
                  name="email"
                  placeholder="nombre@gmail.com"
                  onChange={handleValores}
                />
              </Form.Group>
              <Form.Group className="my-4" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  autoComplete="current-password"
                  minLength="6"
                  maxLength="20"
                  type="password"
                  name="clave"
                  onChange={handleValores}
                />
              </Form.Group>
              {loading ? (
                <>
                <Button className="my-2 w-100" type="submit" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className='ms-2'>
                    <b>Ingresando</b>
                  </span>
                </Button>
              </>
              ) : (
                <>
                <Button className="my-2 w-100" type="submit">
                  <b>Ingresar</b>
                </Button>
                </>
              )}
              <div>
                {errorValid ? (
                  <MsjError
                    text1="Datos incorrectos"
                    text2="Verifique e intente nuevamente"
                  />
                ) : null}
                {dataError !== "" ? <MsjError text2={data} /> : null}
              </div>
              
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
