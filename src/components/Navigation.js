import React, { Component } from 'react';
import { Navbar, Nav, Container, NavDropdown, } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import routes from '../helpers/routes';
import useAuth from '../auth/useAuth'

export default function Navigation() {

    const { logout } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
            <Container fluid>
                <Navbar.Brand as={NavLink} to={routes.home}>WorkStars</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" variant="pills">
                        <NavDropdown title="Admin">
                            <NavDropdown.Item as={NavLink} to={routes.admin.users}>
                                Usuarios
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to={routes.admin.projects}>
                                Proyectos
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav variant="pills">
                        <Nav.Link as={NavLink} to={routes.signin}>
                            Iniciar Sesión
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={routes.signup}>Registrarse</Nav.Link>
                        <Nav.Link as={NavLink} to={routes.account}>Mi cuenta</Nav.Link>
                        <Nav.Link to={routes.account} onClick={logout}>Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}
