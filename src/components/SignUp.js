import React, { Component } from 'react'
import '../styles/SignIn.css'

export default function SignUp() {

    return (
        <div>
            <section className="login py-5">
                <div className="container">
                    <div className="g-0 row">
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <img className="img-fluid" src="https://images4.alphacoders.com/100/thumb-1920-1009824.jpg" alt="" />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7 text-center py-5">
                            <h1 className="animate__animated animate__tada">Create an Account</h1>

                            <form action="" className="py-5">
                                <div className="form-row py-2">
                                    <div className="offset-1 col-lg-10">
                                        <input className="inp px-2" type="email" placeholder="name@example.com" required />
                                    </div>
                                </div>
                                <div className="form-row py-2">
                                    <div className="offset-1 col-lg-10">
                                        <input className="inp px-2" type="email" placeholder="name@example.com" required />
                                    </div>
                                </div>
                                <div className="form-row py-2">
                                    <div className="offset-1 col-lg-10">
                                        <input className="inp px-2" type="email" placeholder="name@example.com" required />
                                    </div>
                                </div>
                                <div className="form-row py-2">
                                    <div className="offset-1 col-lg-10">
                                        <input className="inp px-2" type="password" placeholder="Password" required />
                                    </div>
                                </div>
                                <div className="form-row pt-4">
                                    <div className="offset-1 col-lg-10 py-1">
                                        <button onClick={() => console.log('Usuario Registrado')} className="btn1">Sign Up</button>
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

