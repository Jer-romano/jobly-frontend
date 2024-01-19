import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Card,
    CardBody
  } from "reactstrap";
import "../FormStyles.css";
import JoblyApi from "../api";

const SignUpForm = ({ setToken, setUser }) => {

    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (evt) => {
        const {value, name} = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const token = await JoblyApi.signUp(formData);
            if(token) {
                setToken(token);
                setUser({
                    username: formData.username,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email
                });
            }
           
        } catch(error) {
            console.error(error);
        }
        setFormData(INITIAL_STATE);
        navigate("/");
    };

    return (
        <section>
            <h1>Sign Up</h1>
            <Card>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor='username'>Username</label>
                    <input type="text" 
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor='password'>Password</label>
                    <input type="password" 
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor='firstName'>First Name</label>
                    <input type="text" 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type="text" 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor='email'>Email</label>
                    <input type="text" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    </div>             
                 
                    <button>Submit</button>
                </form> 
            </CardBody>
        </Card>
        </section>
    );



};

export default SignUpForm;