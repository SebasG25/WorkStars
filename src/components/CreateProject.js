import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const projectData = {
    collaborators: [],
}


export default function CreateProject(props) {

    const [data, setData] = useState([])

    const [userSelected, setUserSelected] = useState({})
    const [collaborators, setCollaborator] = useState([])
    const [inactives, setInactives] = useState([])

    const getData = async () => {
        const res = await axios.get('http://localhost:3001/users')
        setData(res.data)
        setInactives(res.data)
    }

    useEffect(() => {
        getData()
    }, [])


    const nameOnChangeHandler = (e) => {
        projectData[e.target.name] = e.target.value
    }

    const addCollaboratorHandler = (e) => {
        e.preventDefault()
        if (!(Object.keys(userSelected).length === 0)) {
            projectData.collaborators.push(userSelected)
            MySwal.fire({
                icon: 'success',
                title: 'Colaborador agregado exitosamente',
                showConfirmButton: false,
                timer: 750
            })
            setCollaborator([...collaborators, userSelected])
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes agregar un colaborador primero!'
            })
        }
    }

    const onSelectChangeHandler = (e) => {
        setUserSelected(JSON.parse(e.target.value))
    }

    const createProject = async (e) => {
        e.preventDefault()
        if (collaborators.length !== 0) {
            if (projectData.hasOwnProperty("name")) {
                try {
                    await axios.post('http://localhost:3001/projects', projectData)
                    MySwal.fire({
                        icon: 'success',
                        title: 'Proyecto creado exitosamente',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    projectData.collaborators = []
                    props.history.push(`/admin/projects`)
                } catch (error) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal!',
                        footer: `<p>${error.name}: ${error.message}</p>`
                    })
                }
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes nombrar el proyecto'
                })
            }
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes agregar por lo menos un colaborador al proyecto'
            })
        }
    }

    return (
        <div>
            <section className="login py-5 my-5">
                <div className="container">
                    <div className="g-0 row row-signin">
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <img
                                className="img-fluid" src="https://i.imgur.com/hriWgYh.jpg"
                                alt="logo"
                                style={{
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7 text-center py-5">
                            <h1 className="animate__animated animate__tada">Crea un Proyecto</h1>

                            <form action="" className="py-5">
                                <div className="form-row py-2">
                                    <div className="form-floating mb-3 offset-2 col-lg-8">
                                        <input type="text" class="form-control" id="floatingInput" name="name" placeholder="Nombre del proyecto" onChange={(e) => nameOnChangeHandler(e)} required />
                                        <label for="floatingInput">Nombre del proyecto</label>
                                    </div>
                                </div>
                                <div className="form-row py-2">
                                    <div className="offset-1 col-lg-10 input-group-lg">

                                        <div className="form-floating offset-1 col-lg-10">
                                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e) => onSelectChangeHandler(e)}>
                                                <option hidden selected>Escoge un colaborador</option>
                                                {
                                                    inactives.map(user => <option key={user.id} value={JSON.stringify(user)}> {user.name}</option>)
                                                }
                                            </select>
                                            <label for="floatingSelect">Works with selects</label>
                                        </div>
                                        <div class="col-auto my-2">
                                            <button class="btn btn-primary mb-3" onClick={(e) => addCollaboratorHandler(e)}>Agregar colaborador</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row pt-4">
                                    <div className="offset-1 col-lg-10 py-1">
                                        <button className="btn1" onClick={(e) => createProject(e)}>Crear Proyecto</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
