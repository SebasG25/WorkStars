import React, { useState, useEffect } from 'react'
import useAuth from '../auth/useAuth'
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import '../styles/Account.css'

const MySwal = withReactContent(Swal)

const Account = () => {
    const { user, updateUser } = useAuth()
    const [userResponse, setUserResponse] = useState({})
    const [show, setShow] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

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

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleChangesConfirmed = () => {
        MySwal.fire({
            title: `¿Deseas confirmar los cambios realizados?`,
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: `Cancelar`,
            denyButtonText: `Confirmar`,
        }).then(async (result) => {
            if (result.isDenied) {
                try {
                    await axios.put(`http://localhost:3001/users/${user.id}`, userResponse)
                    updateUser({description: userResponse.description})
                    MySwal.fire({
                        icon: 'success',
                        title: 'Cambios realizados exitosamente!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    
                } catch (error) {
                    console.log(error)
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal!',
                        footer: `<p>${error.name}: ${error.message}</p>`
                    })
                }
            }
            getUser()
            setIsEditing(false)
        })
    }

    const getUser = async () => {
        const response = await axios.get(`http://localhost:3001/users/${user?.id}`)
        setUserResponse(response.data)
    }

    const onInputDescriptionChange = (e) => {
        setUserResponse({...userResponse, description:e.target.value})
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
                            cursor: 'pointer',
                            border: '5px solid #000',
                        }}
                    />
                </Col>
                <Col className="mt-4">
                    <Card style={{ maxWidth: 360 }} className="mx-auto p-4">
                        <p className="text-center"><b>Nombre: </b>{user?.name}</p>
                        <p className="text-center"><b>Correo: </b>{user?.email}</p>
                        <p className="text-center"><b>Rol: </b>{user?.role}</p>
                        {
                            !isEditing ?
                                <p className="text-center">{user?.description === "" ? `Aún no tienes descripción` : user?.description}</p>
                                :
                                <textarea className="mb-2 p-2" style={{
                                    height: "10em",
                                    width: "100%"
                                }} type="text" onChange={onInputDescriptionChange} minLength="1" rows="5" cols="40" maxLength="500" name="name" placeholder={user?.description !== "" ? user?.description : "Descripción"} />
                        }
                        {
                            !isEditing ?
                                <Button
                                    className="editing-account"
                                    variant="warning"
                                    style={{
                                        boxShadow: 'none',
                                    }}
                                    onClick={handleEdit}
                                >
                                    Editar cuenta
                                </Button>
                                :
                                <Button
                                    className="confirm-changes"
                                    variant="danger"
                                    style={{
                                        boxShadow: 'none'
                                    }}
                                    onClick={handleChangesConfirmed}
                                >
                                    Confirmar cambios
                                </Button>
                        }

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
                    {
                        selectedFile != null &&
                        <div className="text-center">
                            <h5 className="mt-4">Previsualización de imagen</h5>
                            <img
                                className="img-fluid"
                                src={selectedFile}
                                alt="profile-preview"
                                style={{
                                    width: 200,
                                    height: 200,
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
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

