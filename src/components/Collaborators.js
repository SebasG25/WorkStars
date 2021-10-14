import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

var collabs = [];
var inactives = []
const projectData = {}


export default function Collaborators(props) {
    const [collaborators, setCollaborators] = useState([])
    const [projectInfo, setProjectInfo] = useState({})
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState([])
    const [userSelected, setUserSelected] = useState({})

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://localhost:3001/projects/${props.match.params.id}`)
            const resUserData = await axios.get('http://localhost:3001/users')
            setUserData(resUserData.data)
            setProjectInfo(res.data)
            Object.assign(projectData, res.data)

            for (let i = 0; i < res.data.collaborators.length; i++) {
                var resCollaborators = await axios.get(`http://localhost:3001/users/${res.data.collaborators[i]}`)
                collabs.push(resCollaborators?.data)
            }
            setCollaborators(collabs)
            projectData.name = projectInfo.name
            inactives = userData.filter(user => !projectData.collaborators.includes(user.id))
            console.log(userData)
        }
        fetchData()
    }, [props.match.params.id]);

    const addCollaboratorHandler = async () => {
        projectData.collaborators.push(parseInt(userSelected))
        await axios.put(`http://localhost:3001/projects/${props.match.params.id}`, projectData)
        handleClose()
    }

    const onSelectChangeHandler = (e) => {
        setUserSelected(e.target.value)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h2>{projectInfo.name}</h2>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handleShow}>Add collaborator</button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new collaborator!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row justify-content-center">
                            <select className="col-auto text-center inp justify-content-center" id="inputGroupSelect01" onChange={(e) => onSelectChangeHandler(e)}>
                                <option hidden selected>Choose a collaborator</option>
                                {
                                    inactives.map(user => <option key={user.id} value={user.id}> {user.name}</option>)
                                }
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={addCollaboratorHandler}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="row">
                {
                    collaborators.map(collaborator => (
                        <div className="col-md-4 p-2"
                            key={collaborator.id}>
                            <div className="card">
                                <div className="card-body d-flex justify-content-between">
                                    <div><h5 className="card-title">{collaborator.name}</h5></div>
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
        </div>
    )
}
