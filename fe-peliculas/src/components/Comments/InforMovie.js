import React from "react";
import { ListGroup } from "react-bootstrap";

const InforMovie = ({ movies }) => {
  return (
    <div className="my-5 text-inf">
      <ListGroup>
        <ListGroup.Item>
          <h2 className="my-3">
            Nombre de la Pelicula: {movies?.nombre_pelicula}
          </h2>
        </ListGroup.Item>
        <ListGroup.Item>
          {" "}
          <h3 className="my-3">Categoria: {movies?.nombre_categoria}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <h3 className="my-3">Año estreno: {movies?.anio_estreno}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>{movies?.descip_pelicula}</h5>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default InforMovie;
