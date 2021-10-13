import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function Collaborators(props) {
    const [collaborators, setCollaborators] = useState([])

    useEffect(() => {
        async function fetchData(){
            const res = await axios.get(`http://localhost:3001/projects/${props.match.params.id}`)
            const collabs = [];
            for (let i = 0; i < res.data.collaborators.length; i++) {
                const resCollaborators = await axios.get(`http://localhost:3001/users/${res.data.collaborators[i]}`)
                collabs.push(resCollaborators?.data?.name)
            }
            setCollaborators(collabs)
        }
        fetchData()
    }, [props.match.params.id]);

    return (
        <div className="row">
            {
                collaborators.map(collaborator => (
                    <div className="col-md-4 p-2"
                        key={collaborator}>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <div><h5>{collaborator}</h5></div>
                                <div className="d-flex flex-nowrap">
                                    <button
                                        className="btn btn-danger ms-2">
                                        Delete
                                    </button></div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
