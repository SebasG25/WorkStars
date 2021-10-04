import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

export default class Navigation extends Component {

    render(){
        
        return (
            <Navbar bg="dark" variant="dark">
                <Container fluid className="px-5">
                    <LinkContainer to="/signin">
                        <Navbar.Brand>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React logo"
                            />
                            {` `} WorkStars
                        </Navbar.Brand>

                    </LinkContainer>
                    <Nav variant="pills">
                        <LinkContainer to="/signin">
                            <Nav.Link>Sign In</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/aboutus">
                            <Nav.Link>About Us</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}