import React, { useEffect, useState } from 'react'
import axios from "axios";
import useAuth from '../auth/useAuth';

const EmployePosts = (props) => {
    let prueba;
    const { user } = useAuth();
    const [userSession, setUserSession] = useState({})
    const [userReceiver, setUserReceiver] = useState(null)
    const [posts, setPosts] = useState([])


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
        prueba = await userReceiver;
        console.log(prueba)
    }

    let button;
    let h1;
    if (userSession.id !== parseInt(props.match.params.id)) {
        button = <button className="btn btn-primary">Dar una estrella</button>
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1>Post Empleado {userReceiver?.name}</h1>
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
