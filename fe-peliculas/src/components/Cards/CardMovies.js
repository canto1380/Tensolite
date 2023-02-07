import React from 'react';
import { Card } from 'react-bootstrap';
import './cardMovie.css'

const CardMovies = ({m}) => {
    return (
      <div className='containerCard my-3'>
        <Card className='cardBody'>
          <Card.Body>
            <Card.Title>{m.nombre_pelicula}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <div className='d-flex justify-content-between'>
                <div>
                {m.nombre_categoria}
                </div>
                <div>
                {m.anio_estreno}
                </div>
              </div>
            </Card.Subtitle>
            <Card.Text>
              {m.descip_pelicula}
            </Card.Text>
            <Card.Link href={`/comment/${m.id}`} className='btn btn-comment'>Ver comentarios</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
};

export default CardMovies;