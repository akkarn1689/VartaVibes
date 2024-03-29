import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { userContext } from '../context/userContext';

const Navbar = () => {
    const {isLoggedIn} = useContext(userContext);
    return (
        <div>
            {
                isLoggedIn ? (
                    <nav className="navbar navbar-expand-lg navbar-dark position-sticky">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand" to="/">V</NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" to="/chat">Chat</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" to="/contact">Contact</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" to="/logout">Logout</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                ) : (
                    <nav className="navbar navbar-expand-lg navbar-dark position-sticky">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand" to="/">V</NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active">
                                        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" to="/about">About</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" to="/contact">Contact</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" to="/signup">Registration</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                )
            }

        </div>
    )
}

export default Navbar


//VartaVibes