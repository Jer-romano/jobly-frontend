import React, { useContext, useEffect, useState } from "react";
import JobCard from "../jobs/JobCard";
import { useNavigate, useParams } from "react-router-dom";
import JoblyApi from "../api";
import TokenContext from "../contexts/TokenContext";

const CompanyDetail = () => {

    const { handle } = useParams();
    const token = useContext(TokenContext);
    const [company, setCompany] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
        async function getCompany() {
            if(!token) {
                return navigate("/");
            }
            try {
                let res = await JoblyApi.getCompany(handle);
                setCompany(res);
            } catch(error) {
                console.error(error);
            }
        }
        getCompany();
    }, []);

    if(!company) {
        return (<div>›
            Loading...
        </div>);
    }
    else return (<div>
            <h1>{ company.name } </h1>
            <h2>{ company.description }</h2>
            <hr></hr>
            <section>
                {company.jobs.map(job => <JobCard job={job} includeCompany={false}/> )}
            </section>
        </div>);

};

export default CompanyDetail;