import React, { Component } from "react";
import axios from "axios";
import '../styles/Employees.css'

class Employees extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        users: []
    }

    async componentDidMount() {
        await this.getUsers();
    }

    getUsers = async () => {
        const resUsers = await axios.get(`http://localhost:3001/users`);
        this.setState({ users: [...resUsers.data] });
    }

    render() {
        return (
            <div className="row">
                {this.state.users.map((user) => (
                    <div className="col-md-4 p-2" key={user.id}>
                        <div className="card">
                            <div className="card-body d-flex justify-content-between">
                                <img
                                    width="50"
                                    className="img-fluid"
                                    src={user.image}
                                    alt="user"
                                ></img>
                                <div className="mt-2 align-self-center">
                                    <h5 className="card-title">{user.name}</h5>
                                </div>
                                <div className="d-flex flex-nowrap">
                                    <h4 className="align-self-center mx-2">2</h4>
                                    <button className="btn btn-outline-primary" 
                                    onClick={() => this.props.history.push(`/employees/${user.id}/posts`)}>Posts</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Employees;