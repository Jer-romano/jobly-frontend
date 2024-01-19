import React, { useContext, useState } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardText
  } from "reactstrap";
import JoblyApi from "./api";
import "./FormStyles.css"
import TokenContext from "./contexts/TokenContext";


const Profile = ({ user, setUser }) => {

    const INITIAL_STATE = user;
    const token = useContext(TokenContext);

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [isSubmitted, setIsSubmitted] = useState(false);
    //const navigate = useNavigate();

    const handleChange = (evt) => {
        const {value, name} = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        };
        try {
            JoblyApi.token = token;
            let res = await JoblyApi.patchUser(formData.username, data);
            console.log("RESPONSE:", res);
            setUser(res.user);
            setIsSubmitted(true);
        } catch(error) {
            console.error("Error patching user:", error);
        }
    };

    return (
        <section>
            <h1>Profile</h1>
            <Card>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor='username'>Username</label>
                    <input type="text" 
                        id="username"
                        name="username"
                        value={formData.username}
                        disabled={true}
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
                    {isSubmitted && (
                        <div className="alert-msg">
                            <p>Changes saved successfully.</p>
                        </div>
                    )}
          
                    <button>Save Changes</button>
                </form> 
            </CardBody>
        </Card>
        </section>
    );



};

export default Profile;