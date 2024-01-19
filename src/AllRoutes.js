import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Home from "./Home";
import LoginForm from "./auth/Login";
import SignUpForm from "./auth/Signup";
import Profile from "./Profile";
import NotFound from "./NotFound";
import NavBar from "./nav/NavBar";
import JobList from "./jobs/JobList";
import CompanyList from "./companies/CompanyList";
import CompanyDetail from "./companies/CompanyDetail";
import JoblyApi from "./api";
import useLocalStorage from "./hooks/useLocalStorage";
import TokenContext from "./contexts/TokenContext";
import UserContext from "./contexts/UserContext";

const AllRoutes = () => {

    //const [token, setToken] = useState();
    const [token, setToken] = useLocalStorage('token', null);
    const [user, setUser] = useState(null);
    const [applicationIds, setApplicationIds] = useState(new Set([]));

    //const [loggedIn, setLoggedIn] = useState(false);

    // function addApplication(jobId) {
    //     setUser(oldUser => {
    //         oldUser.applications.push(jobId);
    //         return oldUser;
    //     })
    // }

    function hasAppliedToJob(id) {
        return applicationIds.has(id);
    }

    function applyToJob(id) {
        if (hasAppliedToJob(id)) return;
        JoblyApi.applyToJob(user.username, id);
        setApplicationIds(new Set([...applicationIds, id]));
    }

 
    useEffect( () => {
        async function getCurrentUser() {
            if(!token) return;
            if(!JoblyApi.token) {
                JoblyApi.token = token;
            }
            try {
                console.log("TOKEN", token);
                const decoded = jwtDecode(token);
                let res = await JoblyApi.getUser(decoded.username);
                setUser(res);
                setApplicationIds(new Set(res.applications));
            } catch(error) {
                console.error(error);
            }
        }
        getCurrentUser();
    }, [token]);

    return (
        <BrowserRouter>
        <NavBar user={user} setToken={setToken} setUser={setUser} />
        <main>
        <TokenContext.Provider value={token}>
        <UserContext.Provider 
        value={{user, setUser, hasAppliedToJob, applyToJob }}>
        <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route exact path="/companies" element={<CompanyList />}/>
            <Route exact path="/companies/:handle" element={<CompanyDetail />}/>
            <Route exact path="/jobs" element={<JobList />}/>
            <Route path="/login" element={<LoginForm setToken={setToken} setUser={setUser} />}/>             
            <Route path="/signup" element={<SignUpForm setToken={setToken} setUser={setUser} />}/>
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </UserContext.Provider>
        </TokenContext.Provider>
        </main>
      </BrowserRouter>
    )



};

export default AllRoutes;