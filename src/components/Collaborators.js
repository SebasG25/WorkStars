import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

class Collaborators extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    show: false,
    inactives: [],
    users: [],
    collaboratorsData: [],
    projectInfo: {},
    userData: [],
    userSelected: "",
  };

  async componentDidMount() {
    await this.getProjectInfo();
    await this.getNoCollaborators();
  }

  getUsers = async () => {
    const resUsers = await axios.get(`http://localhost:3001/users`);
    this.setState({ users: [...resUsers.data] });
  };

  getNoCollaborators = () => {
    this.setState({
      inactives: this.state.users
        .map((user) => JSON.stringify(user))
        .filter(
          (userString) =>
            !this.state.collaboratorsData
              .map((collaborator) => JSON.stringify(collaborator))
              .includes(userString)
        ).map((u) => JSON.parse(u)),
    });
  };

  getProjectInfo = async () => {
    const resProject = await axios.get(
      `http://localhost:3001/projects/${this.props.match.params.id}`
    );
    await this.setState({ projectInfo: resProject.data });
    await this.setState({ collaboratorsData: this.state.projectInfo.collaborators });
    await this.getUsers();
  };

  handleClose = () => {
    this.setState({ show: !this.state.show });
  };

  addCollaborator = async () => {
    await this.setState(prevState => ({
      collaboratorsData: [...this.state.collaboratorsData, JSON.parse(this.state.userSelected)],
      projectInfo: {
        ...prevState.projectInfo,
        collaborators: [...this.state.collaboratorsData, JSON.parse(this.state.userSelected)]
      }
    }))
    await axios.put(`http://localhost:3001/projects/${this.props.match.params.id}`, this.state.projectInfo)
    this.getNoCollaborators();
    this.handleClose();
  };

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.userSelected)
  }

  deleteCollaborator = async (id) => {
    await this.setState(prevState => ({
      collaboratorsData: prevState.collaboratorsData.filter(user => user.id !== id),
      projectInfo: {
        ...prevState.projectInfo,
        collaborators: prevState.collaboratorsData.filter(user => user.id !== id)
      }
    }))

    await axios.put(`http://localhost:3001/projects/${this.props.match.params.id}`, this.state.projectInfo)

    this.getNoCollaborators();
    console.log(this.state.projectInfo)
    console.log(this.state.collaboratorsData)

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
              <button className="btn btn-primary" onClick={this.handleClose}>
                Agregar colaborador
              </button>
            </div>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Agrega a un nuevo colaborador!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row justify-content-center">
                  <div class="form-floating">
                    <select
                      class="col-auto text-center justify-content-center form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      name="userSelected"
                      value={this.state.userSelected}
                      onChange={this.onInputChange}>
                      <option hidden selected>
                        Escoge un colaborador
                      </option>
                      {this.state.inactives.map((user) => (
                        <option key={user.id} value={JSON.stringify(user)}>
                          {" "}
                          {user.name}
                        </option>
                      ))}
                    </select>
                    <label for="floatingSelect">Lista de colaboradores</label>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={this.addCollaborator}>
                  Agregar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="row">
            {this.state.collaboratorsData.map((user) => (
              <div className="col-md-4 p-2" key={user.id}>
                <div className="card shadow-sm">
                  <div className="card-body d-flex justify-content-between">
                    <img
                      width="50"
                      className="img-fluid"
                      src={user.image}
                      alt="user"
                      style={{
                        objectFit: 'cover'
                      }}
                    ></img>
                    <div className="mt-2 align-self-center">
                      <h5 className="card-title">{user.name}</h5>
                    </div>
                    <div className="d-flex flex-nowrap">
                      <button className="btn btn-danger ms-2" onClick={() => this.deleteCollaborator(user.id)}>Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Collaborators;
