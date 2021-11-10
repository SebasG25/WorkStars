import React, { useEffect, useState } from 'react'
import axios from "axios";
import '../styles/Employees.css'

const Employees = (props) => {
    const [userPostCounter, setUserPostCounter] = useState([])
    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        //getPosts();
        getPostCounter();
        getUsers();
    }, [])

    const getUsers = async () => {
        const resUsers = await axios.get(`http://localhost:3001/users`);
        await setUsersData([...resUsers.data]);
    }

    /*const getPosts = async () => {
        userPostCounter.map((user) => {
            const resPosts = axios.get(`http://localhost:3001/posts?receiver.id=${user.id}`)
            console.log(resPosts)
            setUserPostCounter([...userPostCounter, {...user, postCounter: resPosts.data.length}])
            console.log(user)
        })
        //setUsersData([...postCounter])
    }*/

    const getPostCounter = async () => {
        for (let i = 0; i < usersData.length; i++) {
            const resPosts = await axios.get(`http://localhost:3001/posts?receiver.id=${usersData[i].id}`)
            await setUserPostCounter([...userPostCounter, resPosts.data.length])
            console.log(userPostCounter)
        }
    }

    return (
        <div className="row">
            {usersData.map((user) => (
                <div className="col-md-4 p-2" key={user.id}>
                    <div className="card shadow-sm">
                        <div className="card-body d-flex justify-content-between">
                            <img
                                width="50"
                                className="img-fluid"
                                src={user.image}
                                alt="user"
                                style={{
                                    height:'50px',
                                    width:'50px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                            ></img>
                            <div className="mt-2 align-self-center">
                                <h5 className="card-title">{user.name}</h5>
                            </div>
                            <div className="d-flex flex-nowrap">
                                {/**<h4 className="align-self-center mx-2">{userPostCounter[user.id-1]}</h4>**/}
                                <button className="btn btn-outline-primary"
                                    onClick={() => props.history.push(`/employees/${user.id}/posts`)}>Posts</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Employees;