import React, { useEffect, useState } from 'react'
import axios from "axios";
import useAuth from '../auth/useAuth';
import { Modal, Button } from "react-bootstrap";
import "../styles/EmployeePosts.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const EmployePosts = (props) => {
    const { user } = useAuth();
    const [userSession, setUserSession] = useState({})
    const [userReceiver, setUserReceiver] = useState(null)
    const [posts, setPosts] = useState([])
    const [show, setShow] = useState(false)
    const [description, setDescription] = useState(``)


    useEffect(() => {
        getReceiver();
        fetchUserData();
        getPosts();
    }, [])

    const fetchUserData = async () => {
        await setUserSession(user);
    }

    const getPosts = async () => {
        const resPosts = await axios.get(`http://localhost:3001/posts?receiver.id=${props.match.params.id}`);
        await setPosts([...resPosts.data]);
    };

    const getReceiver = async () => {
        const resUserReceiver = await axios.get(`http://localhost:3001/users?id=${props.match.params.id}`)
        await setUserReceiver(resUserReceiver?.data[0])
    }

    let button;
    if (userSession.id !== parseInt(props.match.params.id)) {
        button = <button className="btn btn-primary">Dar una estrella</button>
    }

    const deletePost = async (post) => {
        try {
            MySwal.fire({
                title: `¿Seguro quieres eliminar este post?`,
                showDenyButton: true,
                showCancelButton: true,
                showConfirmButton: false,
                denyButtonText: `Eliminar`,
                cancelButtonText: `Cancelar`,
                icon: 'warning',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isDenied) {
                    await axios.delete(`http://localhost:3001/posts/${post.id}`)
                    MySwal.fire({
                        icon: 'success',
                        title: 'Proyecto eliminado!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    getPosts();
                }
            })


        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!',
                footer: `<p>${error.name}: ${error.message}</p>`
            })
        }
    }

    const editPost = async (post) => {
        if (description === ``) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que no escribiste nada'
            })
        } else {
            try {
                posts[post.id - 1].post = description
                await axios.put(`http://localhost:3001/posts/${post.id}`, post)
                MySwal.fire({
                    icon: 'success',
                    title: 'Post editado correctamente!',
                    showConfirmButton: false,
                    timer: 1000
                })
                handleClose();
                getPosts();
            } catch (error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal!',
                    footer: `<p>${error.name}: ${error.message}</p>`
                })
                handleClose();
            }
        }
    }

    const onInputChange = (e) => {
        setDescription(e.target.value)
    }

    const handleClose = () => {
        setShow(!show);
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1>Posts Empleado {userReceiver?.name}</h1>
                        {
                            posts.map(post => (
                                <div className="row " key={post.id}>

                                    <div className="col-md-8 p-2">
                                        <div className="card d-flex p-3">
                                            <div className="card-body d-flex justify-content-start">
                                                <img
                                                    width="50"
                                                    className="img-fluid"
                                                    src={post.author.image}
                                                    alt="user"
                                                ></img>
                                                <div className="align-self-center">
                                                    <h5 className="m-0 ms-2 card-title">{post.author.name}</h5>

                                                </div>
                                                <div className="align-self-center justify-content-end flex-grow-2 ms-auto">
                                                    {
                                                        post.author.id === userSession.id &&
                                                        <div>
                                                            <button className="btn btn-outline-primary me-2" onClick={() => setShow(true)}>Editar post</button>
                                                            <button className="btn btn-outline-danger" onClick={() => deletePost(post)}>Eliminar post</button>
                                                        </div>
                                                    }
                                                </div>
                                                <Modal show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Edita la descripción de tu post</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="row justify-content-center">
                                                            <textarea className="inp px-4 pt-4" style={{
                                                                height: "10em",
                                                                width: "80%"
                                                            }} onChange={onInputChange} type="text" minLength="1" rows="5" cols="40" maxLength="500" name="name" placeholder="Descripción del post" />
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="primary" onClick={() => editPost(post)}>
                                                            Editar
                                                        </Button>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Cerrar
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                            <div className="card-text">
                                                <p className="m-0 ms-2">{post.post}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-auto">
                        {button}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployePosts
