import React, { Component } from 'react';
import axios from "axios";

class EmployeePosts extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        posts: [],
        userLogged: {
            email: "federico29.mg@gmail.com",
            role: "regular",
            name: "Federico",
            password: "123",
            id: 2,
            image: "http://assets.stickpng.com/images/585e4bd7cb11b227491c3397.png"
        },
        projectCollaborators: [{}]
    }

    componentDidMount() {
        this.getPosts();
        console.log(this.props)
    }

    getPosts = async () => {
        const resPosts = await axios.get(`http://localhost:3001/posts`);
        this.setState({ posts: [...resPosts.data] });
        console.log(this.state.posts)
    };

    getUserLogged = () => {

    }

    render() {
        let button;
        if (this.state.userLogged.id !== parseInt(this.props.match.params.id)) {
            button = <button className="btn btn-primary">Dar una estrella</button>
        }

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h1>Post Empleado {this.props.match.params.id}</h1>
                            {
                                this.state.posts.map(post => (
                                    <div className="row " key={post.id}>

                                        <div className="col-md-8 p-2">
                                            <div className="card d-flex p-3">
                                                <div className="card-body d-flex justify-content-start">
                                                    <img
                                                        width="50"
                                                        className="img-fluid"
                                                        src={post.author.image}
                                                        alt="user"
                                                        style={{
                                                            height: '50px',
                                                            width: '50px',
                                                            borderRadius: '50%',
                                                            objectFit: 'cover',
                                                        }}
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
}

export default EmployeePosts;