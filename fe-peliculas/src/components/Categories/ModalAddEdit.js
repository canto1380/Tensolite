import React, { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import MsjError from "../../utils/Messages/MsjError";
import { validaNombreChar50 } from "../../utils/validations/validation";
import axios from "axios";

const ModalAddEdit = (props) => {
  const { functionBtn, modalShow, setModalShow, id, category, ...rest } = props;
  const [categoryName, setCategoryName] = useState("");
  const [errorServer, setErrorServer] = useState(false);
  const [errorValid, setErrorValid] = useState(false);
  const [errorRepeat, setErrorRepeat] = useState(false);
  const [msgErrorRepeat, setMsgErrorRepeat] = useState("");
  const [loading, setLoading] = useState(false);

  const BASEURL = `${process.env.REACT_APP_API_URL}/categoria.php/?`;
  const PARAMSURL = `id=${id}`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validaNombreChar50(categoryName)) {
      if (functionBtn === "add") {
        addCategory(e);
      } else {
        editCategory(e);
      }
    } else {
      setErrorValid(true);
      setTimeout(() => {
        setErrorValid(false);
      }, 3000);
    }
  };
  const f = new FormData();
  f.append("nombre_categoria", categoryName);

  const addCategory = async (e) => {
    f.append("METHOD", "POST");
    await axios
      .post(BASEURL, f)
      .then((response) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          e.target.reset();
          clearState();
          window.location.href = `/categoria/`
          setModalShow(false);
        }, 3000);
      })
      .catch((error) => {
        setErrorRepeat(true);
        setMsgErrorRepeat(error.response.data);
        setTimeout(() => {
          setErrorRepeat(false);
        }, 3000);
      });
  };
  const editCategory = async (e) => {
    f.append("METHOD", "PUT");
    await axios
      .post(`${BASEURL}${PARAMSURL}`, f)
      .then((response) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          e.target.reset();
          clearState();
          window.location.href = `/categoria/`
          setModalShow(false);
        }, 3000);
      })
      .catch((error) => {
        setErrorServer(true);
        setTimeout(() => {
          setErrorServer(false);
        }, 3000);
      });
  };
  const clearState = () => {
    setCategoryName("");
  };

  return (
    <Modal
      {...rest}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark" id="contained-modal-title-vcenter">
            <h3>
              {functionBtn === "add" ? "Agregar Categoria" : "Editar Categoria"}
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold text-dark">Nombre Categoria</p>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              onChange={(e) => setCategoryName(e.target.value)}
              defaultValue={category?.nombre_categoria}
              type="text"
              minLength="2"
              maxLength="50"
              placeholder="Comedia"
            />
            <span className="text-danger">
              * Debe contener entre 2 y 50 caracteres
            </span>
          </Form.Group>
        </Modal.Body>
        {loading ? (
          <div className="w-100 mt-5 text-center">
            <Spinner
              as="span"
              animation="border"
              size="lg"
              role="status"
              aria-hidden="true"
            />
            <p>Cargando</p>
          </div>
        ) : (
          <Modal.Footer>
            <Button variant="success" type="submit">
              {functionBtn === "add" ? "Agregar" : "Actualizar"}
            </Button>
            <Button variant="secondary" onClick={props.onHide}>
              Cancelar
            </Button>
          </Modal.Footer>
        )}
        {errorValid ? (
          <MsjError
            text1="Datos incorrectos"
            text2="Verifique que el nombre ingresado sea valido."
          />
        ) : null}
        {errorRepeat ? <MsjError text2={msgErrorRepeat} /> : null}
        {errorServer ? (
          <MsjError
            text1="Hubo un problema en el servidor"
            text2="Intente mas tarde"
          />
        ) : null}
      </Form>
    </Modal>
  );
};

export default ModalAddEdit;
