import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Comments from "../components/Comments";
import Home from "../components/Home";
import Login from "../components/Login";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/comment/:id" element={<Comments />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
