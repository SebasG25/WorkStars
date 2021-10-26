import React from 'react';
import { Navbar, Nav, Container, NavDropdown, } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import routes from '../helpers/routes';
import roles from '../helpers/roles';
import useAuth from '../auth/useAuth'

export default function Navigation() {

    const { user, logout, isLogged } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
            <Container fluid>
                <Navbar.Brand as={NavLink} to={routes.home}>WorkStars</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" variant="pills">
                        {
                            user?.role === roles.admin &&
                            <NavDropdown title="Admin">
                                <NavDropdown.Item as={NavLink} to={routes.admin.users}>
                                    Usuarios
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={routes.admin.projects}>
                                    Proyectos
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                        {
                            isLogged() && 
                            <Nav.Link as={NavLink} to={routes.employees}>
                                Empleados
                            </Nav.Link>}
                        }
                    </Nav>
                    <Nav variant="pills">
                        {
                            !isLogged() && 
                            <Nav.Link as={NavLink} to={routes.signin}>
                                Iniciar Sesión
                            </Nav.Link>
                        }
                        {
                            user?.role === 'admin' && <Nav.Link as={NavLink} to={routes.signup}>Registrar Empleados</Nav.Link>
                        }
                        {
                            isLogged() && <Nav.Link as={NavLink} to={routes.account}>Mi cuenta</Nav.Link>
                        }
                        {
                            isLogged() && <Nav.Link to={routes.account} onClick={logout}>Cerrar Sesión</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}
