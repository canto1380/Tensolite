import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Categories from '../components/Categories';
import Comments from '../components/Comments';
import Home from '../components/Home';
import Login from '../components/Login';
import Movies from '../components/Movies';

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path='/peliculas' element={<Movies />} />
            <Route path='/categorias' element={<Categories/>}/>
            <Route path='/comment/:id' element={<Comments />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default PrivateRoutes;