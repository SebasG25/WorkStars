import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../styles/SignIn.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const userData = {
    role: "regular",
    description: "",
    image: "https://i.imgur.com/B8iomlC.png"
}

const RegEx = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,30}$/,
    password: /^.{4,}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/
}

export default function SignUp() {
    const userValidation = {
        email: "",
        name: "",
        password: "",
    }

    const [validation, setValidation] = useState({ ...userValidation })

    const registerUser = async (e) => {
        e.preventDefault()

        if (validation?.email === validation?.name === validation?.password) {
            await axios.post('http://localhost:3001/users', userData)
            MySwal.fire({
                icon: 'success',
                title: 'Usuario registrado exitosamente',
                showConfirmButton: false,
                timer: 1000
            })
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Debes completar los campos correctamente'
            })
        }
    }

    const emailOnChangeHandler = (e) => {
        userData[e.target.name] = e.target.value
    }

    const passwordOnChangeHandler = (e) => {
        userData[e.target.name] = e.target.value
    }

    const nameOnChangeHandler = (e) => {
        userData[e.target.name] = e.target.value
    }

    const validateForm = (e) => {
        setValidation({
            ...validation,
            [e.target.name]: RegEx[e.target.name].test(e.target.value)
        })
    }

    return (
        <div>
            <section className="login py-3">
                <div className="container">
                    <div className="g-0 row row-signin mx-auto" style={{ width: '80vw', height: '80vh' }}>
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <img
                                className="img-fluid row-image" src="https://i.imgur.com/hriWgYh.jpg"
                                alt="logo"
                                style={{
                                    height: '80vh',
                                    width: '80vw',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7 text-center py-5">
                            <h1 className="animate__animated animate__tada">Crea una cuenta</h1>

                            <form action="" className="py-5">
                                <div className="form-row py-1">
                                    <div className="offset-1 col-lg-10 d-flex flex-column align-items-center">
                                        <div class="form-floating align-self-center col-lg-8">
                                            <input
                                                type="email"
                                                class={`form-control ${validation?.email !== '' ?
                                                    !(validation?.email) ?
                                                        'is-invalid' :
                                                        'is-valid'
                                                    : ''
                                                    }`}
                                                id="floatingInput" name="email" placeholder="nombre@ejemplo.com"
                                                onChange={(e) => emailOnChangeHandler(e)}
                                                onKeyUp={validateForm}
                                                required
                                            />
                                            <label for="floatingInput">Correo electrónico</label>
                                        </div>
                                        {
                                            validation?.email !== "" ?
                                                !(validation?.email) ?
                                                    <p
                                                        className="m-0 text-start"
                                                        style={{ color: 'red' }}
                                                    >
                                                        Por favor ingresa un correo válido
                                                    </p>
                                                    :
                                                    <p
                                                        className="m-0 text-start"
                                                        style={{ color: 'green' }}
                                                    >
                                                        Correo válido
                                                    </p>
                                                :
                                                <div></div>
                                        }
                                    </div>
                                </div>
                                <div className="form-row py-1">
                                    <div className="offset-1 col-lg-10 d-flex flex-column align-items-center">
                                        <div class="form-floating align-self-center col-lg-8">
                                            <input
                                                type="text"
                                                class={`form-control ${validation?.name !== '' ?
                                                    !(validation?.name) ?
                                                        'is-invalid' :
                                                        'is-valid'
                                                    : ''
                                                    }`}
                                                id="floatingInput" name="name" placeholder="Nombre completo"
                                                onChange={(e) => nameOnChangeHandler(e)}
                                                onKeyUp={validateForm}
                                                required
                                            />
                                            <label for="floatingInput">Nombre completo</label>
                                        </div>
                                        {
                                            validation?.name !== "" ?
                                                !(validation?.name) ?
                                                    <p
                                                        className="m-0 text-start"
                                                        style={{ color: 'red' }}
                                                    >
                                                        Por favor ingresa un nombre válido
                                                    </p>
                                                    :
                                                    <p
                                                        className="m-0 text-start"
                                                        style={{ color: 'green' }}
                                                    >
                                                        Nombre válido
                                                    </p>
                                                :
                                                <div></div>
                                        }
                                    </div>
                                </div>
                                <div className="form-row py-1">
                                    <div className="offset-1 col-lg-10 d-flex flex-column align-items-center">
                                    <div class="form-floating align-self-center col-lg-8">
                                            <input
                                                type="password"
                                                class={`form-control ${validation?.password !== '' ?
                                                        !(validation?.password) ?
                                                            'is-invalid' :
                                                            'is-valid'
                                                        : ''
                                                    }`}
                                                id="floatingInput" name="password" placeholder="Contraseña"
                                                onChange={(e) => passwordOnChangeHandler(e)}
                                                onKeyUp={validateForm}
                                                required
                                            />
                                            <label for="floatingInput">Contraseña</label>
                                        </div>
                                        {
                                            validation?.password !== "" ?
                                                !(validation?.password) ?
                                                    <p
                                                        className="m-0 text-start"
                                                        style={{ color: 'red' }}
                                                    >
                                                        Por favor ingresa una contraseña válida, 4 o más caracteres
                                                    </p>
                                                    :
                                                    <p
                                                        className="m-0 text-start"
                                                        style={{ color: 'green' }}
                                                    >
                                                        Contraseña válida
                                                    </p>
                                                :
                                                <div></div>
                                        }
                                    </div>
                                </div>
                                <div className="form-row pt-4">
                                    <div className="offset-1 col-lg-10 py-1">
                                        <button onClick={(e) => registerUser(e)} className="btn1">Registrar</button>
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

