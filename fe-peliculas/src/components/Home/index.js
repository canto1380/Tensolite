import React, { useContext, useEffect } from "react";
import { ContextMovie } from "../../Context/MovieContext";
import { Row, Col, Spinner } from "react-bootstrap";
import CardMovies from "../Cards/CardMovies";
import "./home.css";

const Home = () => {
  const { movies, getMovies } = useContext(ContextMovie);
  useEffect(() => {
    getMovies();
  }, [getMovies]);
  return (
    <div className="container">
      <p className="title m-0 pt-5">Peliculas</p>
      <hr className='mt-1'/>
      {movies.length ? (
        <Row>
          {movies?.map((m) => (
            <Col key={m.id} xs={12} md={6} lg={4} xxl={3}>
              <CardMovies m={m} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="w-100 mt-5 text-center">
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
          />
          <p>Recuperando los datos</p>
        </div>
      )}
    </div>
  );
};

export default Home;
