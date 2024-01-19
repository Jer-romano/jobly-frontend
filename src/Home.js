import React from "react";
import { Link } from "react-router-dom";


const Home = ({ user }) => {

    return (<div>
                <h1>Jobly</h1>
                <h2>All the jobs in one, convenient place.</h2>
                
                { user ? 
                <h1>Welcome Back, {user.firstName}!</h1> :
                <div className="home-buttons">
                <Link to={"/login"}> <button>Log in</button> </Link> 
                <Link to={"/signup"}> <button>Sign up</button> </Link> 
                </div>
                }

              
            </div>);
};

export default Home;