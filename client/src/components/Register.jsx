import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        const userData = {
            username: data.username,
            email: data.email,
            password: data.password,
        };
        console.log(userData);
        await axios.post("/register", userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response);
                // this.props.history.push(from.pathname)
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log(username, email, password);

    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center' >
            <div className='' style={{ width: "50%", marginTop: "20%" }}>
                <h1 className='mb-3'>Register</h1>
                <form className="" onSubmit={handleRegistration} noValidate>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input className="form-control" type="text" id="username" name="username" value={data.username} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-control" type="email" id="email" name="email" value={data.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" name="password" value={data.password} onChange={handleChange} required />
                    </div>
                    <button type='submit' className="btn btn-success w-100">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register