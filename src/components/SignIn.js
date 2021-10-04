import React, { Component } from 'react'
import '../styles/SignIn.css'
import { Container, Row, Col, Form, FloatingLabel, Button, Image } from 'react-bootstrap';


export default class Signin extends Component {


    render() {
        return (
            <div>
                <section className="login py-5">
                    <Container>
                        <Row className="g-0 rowCard">
                            <Col className="col-lg-5 col-md-5 col-sm-5">
                                <Image src="https://images4.alphacoders.com/100/thumb-1920-1009824.jpg" alt="" fluid/>
                            </Col>
                            <Col className="col-lg-7 col-md-7 col-sm-7 text-center py-5">
                                <h1 className="animate__animated animate__tada">Welcome Back</h1>

                                <Form action="">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Row className="form-row py-2">
                                            <Col className="offset-1 col-lg-10">
                                                <FloatingLabel
                                                    controlId="floatingInput"
                                                    label="Email address"
                                                    className="my-2"
                                                >
                                                    <Form.Control type="email" placeholder="name@example.com" required/>
                                                </FloatingLabel>

                                            </Col>
                                        </Row>
                                        <Row className="form-row py-2">
                                            <Col className="offset-1 col-lg-10">
                                                <FloatingLabel controlId="floatingPassword" label="Password">
                                                    <Form.Control type="password" placeholder="Password" required/>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <Row className="form-row pt-4">
                                            <Col className="offset-1 col-lg-10">
                                                <Button className="btn1">Sign In</Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        )
    }
}
