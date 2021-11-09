import React from 'react'
import '../styles/SignIn.css'
import useAuth from '../auth/useAuth'


const userCredentials = {};

export default function Signin() {
    const { login } = useAuth()

    const emailOnChangeHandler = (e) => {
        userCredentials[e.target.name] = e.target.value
    }

    const passwordOnChangeHandler = (e) => {
        userCredentials[e.target.name] = e.target.value
    }

    return (
        <div>
            <section className="login py-5">
                <div className="container">
                    <div className="g-0 row row-signin" style={{width: '80vw', height: '70vh'}}>
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <img
                                className="img-fluid row-image" src="https://i.imgur.com/hriWgYh.jpg"
                                alt="logo"
                                style={{
                                    height: '70vh',
                                    width: '80vw',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7 text-center py-5">
                            <h1 className="animate__animated animate__tada">Bienvenido</h1>

                            <form action="" className="py-5">
                                <div className="form-row py-2">
                                    <div className="offset-1 col-lg-10">
                                        <input className="inp px-2" type="email" placeholder="nombre@ejemplo.com" name="email" onChange={(e) => emailOnChangeHandler(e)} required />

                                    </div>
                                </div>
                                <div className="form-row py-2">
                                    <div className="offset-1 col-lg-10">
                                        <input className="inp px-2" type="password" placeholder="Contraseña" name="password" onChange={(e) => passwordOnChangeHandler(e)} required />
                                    </div>
                                </div>
                                <div className="form-row pt-4">
                                    <div className="offset-1 col-lg-10 py-1">
                                        <button onClick={(e) => login(userCredentials, e)} className="btn1">Entrar</button>
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

