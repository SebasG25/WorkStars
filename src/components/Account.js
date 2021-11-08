import React, { useState, useEffect } from 'react'
import useAuth from '../auth/useAuth'
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

const MySwal = withReactContent(Swal)

const Account = () => {
    const { user, updateUser } = useAuth()
    const [userResponse, setUserResponse] = useState({})
    const [show, setShow] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        getUser();
    }, [])

    const handleClose = () => {
        setShow(!show)
        getUser()
    }

    const handleFileChange = (e) => {
        const [file] = e.target.files;
        const SIZE_10MB = 10 * 1024 * 1024
        const isValidSize = file?.size < SIZE_10MB
        const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
        const isValidType = isNameOfOneImageRegEx.test(file?.name)

        if (!isValidSize) {
            return MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que el tamaño de la imagen es muy grande',
                footer: 'El tamaño máximo es 10MB'
            })
        }
        if (!isValidType) {
            return MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que el archivo que subiste no es una imagen',
            })
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            setSelectedFile(reader.result)
            setUserResponse({ ...user, "image": reader.result })
        }
        reader.readAsDataURL(file)
    }

    const handleUpdateProfilePic = async () => {
        if (!selectedFile) {
            return MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que no subiste ningún archivo',
            })
        }
        try {
            await axios.put(`http://localhost:3001/users/${user.id}`, userResponse)

        } catch (error) {
            return MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!',
                footer: `<p>${error.name}: ${error.message}</p>`
            })
        }
        handleClose()
    }

    const getUser = async () => {
        const response = await axios.get(`http://localhost:3001/users/${user?.id}`)
        setUserResponse(response.data)
    }

    return (
        <Container>
            <Row className="mt-4">
                <Col xs={12} className="text-center">
                    <img src={userResponse?.image}
                        alt="avatar"
                        onClick={() => setShow(true)}
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }}
                    />
                </Col>
                <Col className="mt-4">
                    <Card style={{ maxWidth: 360 }} className="mx-auto p-4">
                        <p className="text-center"><b>Nombre: </b>{user.name}</p>
                        <p className="text-center"><b>Correo: </b>{user.email}</p>
                        <p className="text-center"><b>Rol: </b>{user.role}</p>

                        <Button variant="warning">Editar cuenta</Button>
                    </Card>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambiar mi foto de perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg, jpeg, .gif, .png"
                        />
                    </Form>
                    <h5 className="mt-4">Previsualización de imagen</h5>
                    {
                        selectedFile != null &&
                        <img
                            className="img-fluid"
                            src={selectedFile}
                            alt="profile-preview"
                        />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdateProfilePic}>
                        Actualizar imagen
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Account

