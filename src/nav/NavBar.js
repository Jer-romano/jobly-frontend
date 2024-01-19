import React from "react";
import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";

function NavBar({ user, setToken, setUser }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        setToken('');
        setUser(null);
        navigate("/");
    }

  return (
    <div>
      <Navbar  className="navbar-container" expand="md">
        <NavLink to="/" className="navbar-brand">
          Jobly
        </NavLink>
        
            { user && 
                <><Nav className="ml-auto d-flex justify-content-between" navbar>
                      <NavItem >
                          <NavLink to="/companies">Companies</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink className="navlink" to="/jobs">Jobs</NavLink>
                      </NavItem>
                  </Nav>
                  <Nav className="ml-auto" navbar>
                          <NavItem>
                              <NavLink to="/profile">Profile</NavLink>
                          </NavItem>
                      </Nav><Nav className="ml-auto" navbar>
                          <NavItem>
                              <button onClick={() => handleLogout()}>
                                Log out {user.username}
                              </button>
                          </NavItem>
                      </Nav></>
            }
            { !user &&
                <><Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink to="/login">Log In</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/signup">Sign Up</NavLink>
                </NavItem>
            </Nav></>
            }
            
      </Navbar>
    </div>
  );
}

export default NavBar;