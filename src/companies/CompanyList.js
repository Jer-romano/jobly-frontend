import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySearchForm from './CompSearchForm';
import CompanyCard from './CompanyCard';
import JoblyApi from '../api';
import TokenContext from '../contexts/TokenContext';

const CompanyList = () => {
    const token = useContext(TokenContext);
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

   
    useEffect(() => {
        async function getCompanies() {
            if(!token) {
                return navigate("/");
            }
            try {
                const resp = await JoblyApi.getAllCompanies();
                setCompanies(resp);
            } catch(error) {
                console.error(error);
            }
        }
        getCompanies();
    }, []);  
    

    return (
        <>
        <CompanySearchForm setCompanies={setCompanies}/>
            {companies.map(company => <CompanyCard company={company}/>)}
        </>
    );

};

export default CompanyList;