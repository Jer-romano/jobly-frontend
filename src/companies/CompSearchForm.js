import React, {useState} from 'react';
import { redirect }  from "react-router-dom";
import "../FormStyles.css";
import JoblyApi from '../api';

import {
    Card,
    CardBody,
    CardTitle,
    CardText
  } from "reactstrap";

const CompanySearchForm = ({ setCompanies }) => {

    const INITIAL_STATE = {
        term: "",
        minEmployees: 0,
        maxEmployees: 0,
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
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
        const resp = await JoblyApi.searchCompanies(formData);
        setCompanies(resp);
        setFormData(INITIAL_STATE);
    };

    return (
        <section>
            <Card>
            <CardBody>
                
                <form onSubmit={handleSubmit}>
                    <div>
                    <input type="text" 
                        id="term"
                        name="term"
                        placeholder='Enter search term...'
                        value={formData.term}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor='minEmployees'>Minimum Number of Employees</label>
                    <input type="number" 
                        id="minEmployees"
                        name="minEmployees"
                        value={formData.minEmployees}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor='maxEmployees'>Maximum Number of Employees</label>
                    <input type="number" 
                        id="maxEmployees"
                        name="maxEmployees"
                        value={formData.maxEmployees}
                        onChange={handleChange}
                    />
                    </div>
                  
                  
                
                    <button>Submit</button>
                </form> 
            </CardBody>
        </Card>
        <hr></hr>
        </section>
    );

};

export default CompanySearchForm;