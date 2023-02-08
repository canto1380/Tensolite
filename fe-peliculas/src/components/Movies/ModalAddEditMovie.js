import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import MsjError from "../../utils/Messages/MsjError";
import {
  validaAnio,
  validaDescripcion,
  validaNombreChar50,
} from "../../utils/validations/validation";
import axios from "axios";
import { ContextMovie } from "../../Context/MovieContext";

const ModalAddEditMovie = (props) => {
  const { category, getCategory } = useContext(ContextMovie);
  const { functionBtn, setModalShow, id, ...rest } = props;
  const [dataMovie, setDataMovie] = useState({
    nombre_pelicula: "",
    descip_pelicula: "",
    anio_estreno: "",
    id_categoria: null,
  });
  const [errorServer, setErrorServer] = useState(false);
  const [errorValid, setErrorValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const BASEURL = `${process.env.REACT_APP_API_URL}/pelicula.php/?`;
  const PARAMSURL = `id=${id}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataMovie({ ...dataMovie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      validaNombreChar50(dataMovie.nombre_pelicula) &&
      validaAnio(dataMovie.anio_estreno) &&
      validaDescripcion(dataMovie.descip_pelicula)
    ) {
      if (functionBtn === "add") {
        addMovie(e);
      } else {
        editMovie(e);
      }
    } else {
      setErrorValid(true);
      setTimeout(() => {
        setErrorValid(false);
      }, 3000);
    }
  };
  const f = new FormData();
  f.append("nombre_pelicula", dataMovie.nombre_pelicula);
  f.append("descrip_pelicula", dataMovie.descip_pelicula);
  f.append("anio_estreno", dataMovie.anio_estreno);
  f.append("id_categoria", dataMovie.id_categoria);
  const addMovie = async (e) => {
    f.append("METHOD", "POST");
    await axios
      .post(BASEURL, f)
      .then((response) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          e.target.reset();
          window.location.href = `/pelicula/`
          clearState();
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
  const editMovie = async (e) => {
    f.append("METHOD", "PUT");
    await axios
      .post(`${BASEURL}${PARAMSURL}`, f)
      .then((response) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          e.target.reset();
          window.location.href = `/pelicula/`
          clearState();
          clearState();
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
    setDataMovie({
      ...dataMovie,
      nombre_pelicula: "",
      descip_pelicula: "",
      anio_estreno: "",
      id_categoria: "",
    });
  };

  useEffect(() => {
    getCategory();
    // eslint-disable-next-line
  }, []);

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
              {functionBtn === "add" ? "Agregar Pelicula" : "Editar Pelicula"}
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <p className="fw-bold text-dark mb-1">Nombre Pelicula</p>
            <Form.Control
              onChange={handleChange}
              name="nombre_pelicula"
              type="text"
              minLength="2"
              maxLength="50"
              placeholder="Comedia"
            />
            <span className="text-danger">
              * Debe contener entre 2 y 50 caracteres
            </span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <p className="fw-bold text-dark mb-1">Descripcion</p>
            <Form.Group className="" controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                name="descip_pelicula"
                type="textArea"
                minLength="15"
                maxLength="200"
                placeholder="Descripcion"
              />
            </Form.Group>
            <span className="text-danger">
              * Debe contener entre 15 y 200 caracteres
            </span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <p className="fw-bold text-dark mb-1">Año Estreno</p>
            <Form.Select
              onChange={handleChange}
              name="anio_estreno"
              type="Select"
              placeholder="Seleccione.."
            >
              <option value={2015}>2015</option>
              <option value={2016}>2016</option>
              <option value={2017}>2017</option>
              <option value={2018}>2018</option>
              <option value={2019}>2019</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <p className="fw-bold text-dark mb-1">Categoria</p>
            <Form.Select
              onChange={handleChange}
              name="id_categoria"
              type="Select"
              placeholder="Seleccione.."
            >
              <option>Seleccione..</option>
              {category?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre_categoria}
                </option>
              ))}
            </Form.Select>
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
            text2="Verifique si los campos ingresados cumplen con la longitud deseada."
          />
        ) : null}
        {/* {errorPaisExist ? <MsjError text2={errorPaisExistDescr} /> : null} */}
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

export default ModalAddEditMovie;
