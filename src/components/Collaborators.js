import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function Collaborators(props) {
    const [collaborators, setCollaborators] = useState([])

    useEffect(() => {
        async function fetchData(){
            const res = await axios.get(`http://localhost:3001/projects/${props.match.params.id}`)
            setCollaborators(res?.data?.collaborators)
        }
        fetchData()
    }, [props.match.params.id]);

    return (
        <div className="row">
            {
                collaborators.map(collaborator => (
                    <div className="col-md-4 p-2"
                        key={collaborator.id}>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <div><h5>{collaborator.name}</h5></div>
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
