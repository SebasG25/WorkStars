import React, { useState, useEffect } from 'react'
import axios from 'axios'

const projectData = {}

export default function CreateProject() {

    const [data, setData] = useState([])

    const getData = async () => {
        const res = await axios.get('http://localhost:3001/users')
        setData(res.data)
    }

    useEffect(() => {
        getData()
    }, [])


    const nameOnChangeHandler = (e) => {
        projectData[e.target.name] = e.target.value
    }


    return (
        <div>
            <section className="login py-5 my-5">
                <div className="container">
                    <div className="g-0 row row-signin">
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <img className="img-fluid" src="https://images4.alphacoders.com/100/thumb-1920-1009824.jpg" alt="" />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7 text-center py-5">
                            <h1 className="animate__animated animate__tada">Create a Project</h1>

                            <form action="" className="py-5">
                                <div className="form-row py-2">
                                    <div className="offset-1 col-lg-10">
                                        <input className="inp px-2" type="text" name="name" placeholder="Project Name" required onChange={(e) => nameOnChangeHandler(e)} />
                                    </div>
                                </div>
                                <div className="form-row py-2">
                                    <div className="offset-1 col-lg-10 input-group-lg">

                                        <select className="inp px-2" id="inputGroupSelect01">
                                            <option hidden selected>Choose a collaborator</option>
                                            {
                                                data.map(user =>
                                                    <option key={user.id} value={user.id}>{user.name}</option>
                                                )
                                            }
                                        </select>
                                        <div class="col-auto my-2">
                                            <button class="btn btn-primary mb-3">Add collaborator</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row pt-4">
                                    <div className="offset-1 col-lg-10 py-1">
                                        <button className="btn1">Sign Up</button>
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
