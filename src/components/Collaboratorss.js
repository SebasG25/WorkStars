import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

class Collaboratorss extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        show: false,
        inactives: [{id: 4, name: "Daniel"}, {id: 5, name: "Prueba"}],
        users: [],
        collaboratorsData: ["Sebastian","Federico","Dianella"],
        projectInfo: {},
        userData: [],
        userSelected: {},
        ejemplo: {
            "collaborators": [
                1,
                2,
                3,
                5
            ],
            "name": "project 1",
            "id": 1
        }
    }

    componentDidMount() {
        this.getCollaborators()
        this.getProjectInfo()
        this.getCollaboratorsProject()
        //this.getNoCollaborators()
    }

    getCollaborators = async () => {
        const resCollaborators = await axios.get(`http://localhost:3001/users`)
        this.setState({ users: resCollaborators.data })
    }

    getNoCollaborators = () => {
        this.setState({inactives: this.state.users.filter(user => !this.state.projectInfo.collaborators.includes(user.id))})
    }

    getProjectInfo = async () => {
        const resProject = await axios.get(`http://localhost:3001/projects/${this.props.match.params.id}`)
        this.setState({ projectInfo: resProject.data })
    }

    getCollaboratorsProject = () => {
        for (let i = 0; i < this.state.projectInfo.collaborators; i++) {
            for (let j = 0; j < this.state.users; j++) {
                
            }
        }
    }

    handleClose = () => {
        this.setState({ show: !this.state.show })
    }

    addCollaborator = () => {
        this.setState({collaboratorsData: [...this.state.collaboratorsData, "Daniel"], 
        inactives: this.state.inactives.filter(user => user.name != "Daniel" )})
        this.handleClose()
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h2>{this.state.projectInfo.name}</h2>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary" onClick={this.handleClose}>Add collaborator</button>
                        </div>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add a new collaborator!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row justify-content-center">
                                    <select className="col-auto text-center inp justify-content-center" id="inputGroupSelect01">
                                        <option hidden selected>Choose a collaborator</option>
                                        {
                                            this.state.inactives.map(user => <option key={user.id} value={user.id}> {user.name}</option>)
                                        }
                                    </select>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={this.addCollaborator}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div className="row">
                        {
                            this.state.collaboratorsData.map(user => (
                                <div className="col-md-4 p-2"
                                    key={user}>
                                    <div className="card">
                                        <div className="card-body d-flex justify-content-between">
                                            <div><h5 className="card-title">{user}</h5></div>
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
            </div>
        );
    }
}

export default Collaboratorss;