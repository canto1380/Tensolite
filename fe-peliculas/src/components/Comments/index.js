import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  ListGroup,
  Form,
  Row,
  Col,
  Button,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContextMovie } from "../../Context/MovieContext";
import "./comment.css";
import InforMovie from "./InforMovie";
import ItemsComment from "./ItemsComment";
import axios from "axios";
import { validaComentario } from "../../utils/validations/validation";

const Comments = () => {
  const { getComment, comment, movies, getMovies } = useContext(ContextMovie);
  const { id } = useParams();
  const [comentario, setComentario] = useState("");
  const [token, setToken] = useState(null);
  const [validError, setValidError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);

  const BASEURL = `${process.env.REACT_APP_API_URL}/comentario.php/`;

  const PARAMSURLCOMMENT = `id_pelicula=${id}`;
  const PARAMSURLMOVIE = `id=${id}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validaComentario(comentario)) {
      addComment(e);
    } else {
      setValidError(true);
      setTimeout(() => {
        setValidError(false);
      }, 3000);
    }
  };
  const addComment = async (e) => {
    const f = new FormData();
    f.append("comentario", comentario);
    f.append("id_pelicula", id);
    f.append("METHOD", "POST");

    await axios
      .post(BASEURL, f)
      .then((response) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          e.target.reset();
        }, 3000);
      })
      .catch((error) => {
        setServerError(true);
        setTimeout(() => {
          setServerError(false);
        }, 3000);
        console.log(error);
      });
  };

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("jwt-security-page")));
  }, []);
  useEffect(() => {
    getComment(PARAMSURLCOMMENT);
  }, [PARAMSURLCOMMENT, getComment]);

  useEffect(() => {
    getMovies(PARAMSURLMOVIE);
  }, [PARAMSURLMOVIE, getMovies]);

  return (
    <Container className="my-5 px-5">
      <div className="my-4">
        <div className="my-3 text-center">
          <h1 className="title">Informacion de la Pelicula</h1>
        </div>
        <InforMovie movies={movies} />

        <div className="my-3">
          <h3 className="title-comment">Comentarios</h3>
        </div>
        <div>
          {token ? (
            <Form className="mb-5" onSubmit={handleSubmit}>
              <Row className="d-flex justify-content-between m-0 h-100">
                <Col sm={12} className="area-comentario">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={(e) => setComentario(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div>
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
                  <Col sm={12} className="my-3 px-3 text-end">
                    <Button type="submit">Enviar comentario</Button>
                  </Col>
                )}
                {validError ? (
                  <span className="text-danger px-3">
                    El comentario debe tener entre 15 y 250 caracteres
                  </span>
                ) : null}
                {serverError ? (
                  <span className="text-danger px-3">
                    Hubo un error en el servidor. Intente mas tarde.
                  </span>
                ) : null}
              </div>
            </Form>
          ) : (
            <p className="text-danger fw-bolder">
              Para agregar un comentario, debe estar registrado previamente.{" "}
              <span>
                <a href="/login"> Iniciar Sesion</a>
              </span>
            </p>
          )}

          <hr />
          <ListGroup className="my-3">
            {comment?.map((c) => (
              <ItemsComment key={c.id} c={c} />
            ))}
          </ListGroup>
        </div>
      </div>
    </Container>
  );
};

export default Comments;
