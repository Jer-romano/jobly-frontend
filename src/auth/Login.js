import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
    Card,
    CardBody,
    CardTitle,
    CardText
  } from "reactstrap";
import JoblyApi from "../api";


const LoginForm = ({ setToken, setUser }) => {

    const INITIAL_STATE = {
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();

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
            const token = await JoblyApi.login(formData);
            if(token) {
                setToken(token);
                setFormData(INITIAL_STATE);
                // const user = await JoblyApi.getUser(formData.username);
                // setUser(user);
                // const decoded = jwtDecode(token);
                // console.log(decoded);
                // console.log("hello");
                navigate("/");
            }

        } catch(error) {
            console.error(error);
        }
        
        
    };

    return (
        <section>
            <h1>Log In</h1>
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
                                        
                    <button>Submit</button>
                </form> 
            </CardBody>
        </Card>
        </section>
    );



};

export default LoginForm;