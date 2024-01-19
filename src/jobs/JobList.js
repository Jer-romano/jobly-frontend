import React, { useState, useEffect, useContext } from 'react';
import JobSearchForm from './JobSearchForm';
import JobCard from './JobCard';
import JoblyApi from '../api';
import TokenContext from '../contexts/TokenContext';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
    const token = useContext(TokenContext);
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getJobs() {
            if(!token) {
                return navigate("/");
            }
            try {
                const resp = await JoblyApi.getAllJobs();
                setJobs(resp);
            } catch(error) {
                console.error(error);
            }
         }
        getJobs();
    }, []);  
    return (
        <>
        <JobSearchForm setJobs={setJobs}/>
            {jobs.map(job => <JobCard job={job} includeCompany={true}/>)}
        </>
    );

};

export default JobList;