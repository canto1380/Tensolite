import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import './comment.css'
const ItemsComment = ({ c }) => {
  return (
    <Container fluid>
      <Row className="d-flex justify-content-between m-0 h-100">
        <Col xs={9} className="area-comentario">
          <h6>Nombre de usuario</h6>
        </Col>
        <Col xs={3} className="d-flex justify-content-end">
          <p className="text-muted">
            {moment(c.fecha_comentario).format('lll')}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
        <p className='box'>{c.comentario}</p>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default ItemsComment;
