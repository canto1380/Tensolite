import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { deleteToken } from "../../helpers/helpers";
import { AiOutlineUser, AiOutlineMenu, AiOutlineComment } from "react-icons/ai";
import { BsDoorOpen } from "react-icons/bs";
import { MdOutlineCategory, MdOutlineLocalMovies } from "react-icons/md";
import "./navbar.css";

const Navb = () => {
  const [tokenAuth, setTokenAuth] = useState([]);
  const [tokenAuthBan, setTokenAuthBan] = useState(false);

  const cerrarSesion = async (e) => {
    deleteToken();
    setTokenAuthBan(false);
  };

  useEffect(() => {
    setTokenAuth(JSON.parse(localStorage.getItem("jwt-security-page")));
  }, [tokenAuthBan]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Movie Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
          </Nav>
          {tokenAuth === null ? (
            <Nav>
              <Nav.Link href="/login">Log In</Nav.Link>
            </Nav>
            
          ) : (
            <ul className="navbar-nav ms-auto menuAlign">
              <li className={`nav-item dropdown text-center`}>
                <a
                href="/mi-cuenta"
                  className="nav-link"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role="button"
                >
                  <AiOutlineUser className={`sizeIcon iconHidden`} />
                  <p className="my-0">Mi Cuenta</p>
                </a>
              </li>
              <li className="li-drop nav-item text-center w-responsive menuAlign">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="drop p-responsive"
                  >
                    <div>
                      <AiOutlineMenu className={`sizeIcon iconHidden`} />
                    </div>
                    Menu
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdownAlign">
                    <Dropdown.Item href="/categoria">
                      <MdOutlineCategory
                        className={`sizeIcon dropdownColor me-2`}
                      />
                      <span className="fw-bold">Categorias</span>
                    </Dropdown.Item>
                    <Dropdown.Item href="/pelicula" className="py-2">
                      <MdOutlineLocalMovies
                        className={`sizeIcon dropdownColor me-2`}
                      />
                      <span className="fw-bold">Peliculas</span>
                    </Dropdown.Item>
                    <Dropdown.Item href="/comentarios">
                      <AiOutlineComment
                        className={`sizeIcon dropdownColor me-2`}
                      />
                      <span className="fw-bold">Comentarios</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>

              <li className="nav-item text-center">
                <a
                  onClick={cerrarSesion}
                  className="nav-link"
                  aria-current="page"
                  href="/"
                >
                  <BsDoorOpen className={`sizeIcon iconHidden`} />
                  <p className="my-0">Salir</p>
                </a>
              </li>
            </ul>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navb;
