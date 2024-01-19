import React, {useState} from 'react';
import { redirect }  from "react-router-dom";
import "../FormStyles.css";
import {
    Card,
    CardBody,
    CardTitle,
    CardText
  } from "reactstrap";
import JoblyApi from '../api';

const JobSearchForm = ({ setJobs }) => {

    const INITIAL_STATE = {
        term: "",
        minSalary: 0,
        hasEquity: ""
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
        const resp = await JoblyApi.searchJobs(formData);
        setJobs(resp);
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
                   <label htmlFor='minSalary'>Minimum Salary:</label>
                    <input type="number" 
                        id="minSalary"
                        name="minSalary"
                        value={formData.minSalary}
                        onChange={handleChange}
                    />
                   </div>
                   <div>

                   <label htmlFor='hasEquity'>Has Equity? </label>
                        <select
                            name='hasEquity'
                            id='hasEquity'
                            value={formData.hasEquity}
                            onChange={handleChange}
                            >
                            <option value="NA">NA</option>
                            <option value="true">true</option>
                            <option value="true">false</option>
                        </select>
                   </div>
                    
                
                    <button>Submit</button>
                </form> 
            </CardBody>
        </Card>
        <hr></hr>
        </section>
    );

};

export default JobSearchForm;