import React, { createContext, useState } from "react";
import axios from "axios";

export const ContextMovie = createContext();

const MovieContext = (props) => {
  const getMovieURL = `${process.env.REACT_APP_API_URL}`;
  const [movies, setMovies] = useState([]);
  const [comment, setComment] = useState([]);
  const [category, setCategory] = useState([]);
  const [movie, setMovie] = useState([]);

  const getMovies = async (paramsURL) => {
    await axios
      .get(`${getMovieURL}/pelicula.php/?${paramsURL}`)
      .then((resp) => {
        const response = resp.data;
        setMovies(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getComment = async (paramsURL) => {
    await axios
      .get(`${getMovieURL}/comentario.php/?${paramsURL}`)
      .then((resp) => {
        const response = resp.data;
        setComment(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategory = async (paramsURL) => {
    await axios
      .get(`${getMovieURL}/categoria.php/?${paramsURL}`)
      .then((resp) => {
        const response = resp.data;
        setCategory(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getMovie = async (paramsURL) => {
    await axios
      .get(`${getMovieURL}/pelicula.php/?${paramsURL}`)
      .then((resp) => {
        const response = resp.data;
        setMovie(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ContextMovie.Provider
      value={{
        movies,
        getMovies,
        comment,
        getComment,
        category,
        getCategory,
        movie,
        getMovie,
      }}
    >
      {props.children}
    </ContextMovie.Provider>
  );
};

export default MovieContext;
