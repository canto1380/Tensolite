import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdRestore } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./tables.css";
import ModalAddEdit from "../Categories/ModalAddEdit";
import ModalAddEditMovie from "../Movies/ModalAddEditMovie";

const Keypad = ({ id, deleted, id_name }) => {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [category, setCategory] = useState([])
  const [movie, setMovie] = useState([])

  const BASEURL = `${process.env.REACT_APP_API_URL}/${id_name}.php/?id=`;
  const f = new FormData();
  f.append("METHOD", "PUT");
  const handleBtn = async (id) => {
    if (deleted) {
      restoreFunction(id);
    } else {
      deletefuntion(id);
    }
  };
  const deletefuntion = async (id) => {
    Swal.fire({
      title: `Estas seguro que desea eliminar la ${id_name}?`,
      text: "Tenga en cuenta que se la puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    })
      .then(async (res) => {
        if (res.isConfirmed) {
          await axios
            .post(`${BASEURL}${id}`, f)
            .then((response) => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                window.location.href = `/${id_name}/`;
              }, 3000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const restoreFunction = async (id) => {
    await axios
      .post(`${BASEURL}${id}`, f)
      .then((response) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.href = `/${id_name}/`
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategoryById = async (id) => {
    await axios
      .get(`${BASEURL}${id}`)
      .then((resp) => {
        const response = resp.data;
        setCategory(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getMovieById = async(id) => {
    await axios
      .get(`${BASEURL}${id}`)
      .then((resp) => {
        const response = resp.data;
        setMovie(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getCategoryById(id);
    // eslint-disable-next-line
  },[id]);
  useEffect(() => {
    getMovieById(id)
    // eslint-disable-next-line
  },[id])

  return (
    <Container>
      <Row className="d-flex justify-content-evenly">
        <Col className="d-flex justify-content-end">
          <Button
            className="mx-2"
            as={Link}
            type="button"
            title="Editar"
            onClick={() => setModalShow(true)}
          >
            <AiOutlineEdit className={``} />
          </Button>
          {id_name === "categoria" ? (
            <ModalAddEdit
              show={modalShow}
              onHide={() => setModalShow(false)}
              setModalShow={setModalShow}
              functionBtn="edit"
              id={id}
              category={category}
            />
          ) : (
            <ModalAddEditMovie
              show={modalShow}
              onHide={() => setModalShow(false)}
              setModalShow={setModalShow}
              functionBtn="edit"
              id={id}
              movie={movie}
            />
          )}
          {deleted ? (
            <Button
              variant="success"
              className="mx-2"
              title="Restituir"
              onClick={() => handleBtn(id, deleted)}
            >
              <MdRestore className={``} />
            </Button>
          ) : (
            <Button
              className="mx-2"
              variant="danger"
              title="Eliminar"
              onClick={() => handleBtn(id, deleted)}
            >
              <AiOutlineDelete className={``} />
            </Button>
          )}
        </Col>
      </Row>
      {loading ? (
        <div className="w-100 mt-5 text-center aa">
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
          />
          <p>Cargando</p>
        </div>
      ) : null}
    </Container>
  );
};

export default Keypad;
