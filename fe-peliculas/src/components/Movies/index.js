import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Keypad from "../Tables/Keypad";
import ModalAddEditMovie from "./ModalAddEditMovie";
import { ContextMovie } from "../../Context/MovieContext";
import TableFormat from '../Tables'

const Movies = () => {
const {movie, getMovie} = useContext(ContextMovie)
  const [modalShow, setModalShow] = useState(false)

const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "nombre_pelicula",
      key: "nombre_pelicula",
    },
    {
      title: "Descripcion",
      dataIndex: "descip_pelicula",
      key: "descip_pelicula",
    },
    {
      title: "Estreno",
      dataIndex: "anio_estreno",
      key: "anio_estreno",
    },
    {
      title: "Categoria",
      dataIndex: "nombre_categoria",
      key: "nombre_categoria",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return record?.deleted === 1 ? (
          <Keypad id={record.id} deleted={true} id_name='pelicula'/>
        ) : (
          <Keypad id={record.id} deleted={false} id_name='pelicula'/>
        );
      },
    },
  ];

  useEffect(() => {
    getMovie();
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center">
        <Col>
          <h1 className="text-center mt-3 title">Menu Peliculas</h1>
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-center mt-5">
        <Col xs={10} sm={8}>
          <h4 className="text-dark">
            <span className="">Listado de Peliculas</span>
          </h4>
        </Col>
        <Col xs={2} sm={4}>
          <div className="d-flex justify-content-end">
            <Button
              variant="outline-dark btn-add"
              className="sizeIcon"
              onClick={() => setModalShow(true)}
            >
              <AiOutlinePlusSquare className={`sizeIcon`} />
            </Button>
            <ModalAddEditMovie
              show={modalShow}
              onHide={() => setModalShow(false)}
              setModalShow={setModalShow}
              functionBtn="add"
            />
          </div>
        </Col>
      </Row>
      <TableFormat data={movie} columns={columns} />
    </Container>
  );
};

export default Movies;
