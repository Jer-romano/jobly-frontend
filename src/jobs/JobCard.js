import React, {useContext, useState} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardText
} from "reactstrap";
import ApplyButton from './ApplyButton';
import UserContext from '../contexts/UserContext';


const JobCard = ({ job, includeCompany }) => {

    const { user } = useContext(UserContext);

    return (
        <section>
             <Card>
            <CardBody>
            <CardTitle>
               <h3>{ job.title }</h3> 
               { includeCompany && job.companyName }
            </CardTitle>
            <CardText>
            </CardText>
            <p>
                Salary: {job.salary}
            </p>
            <p>
                Equity: {job.equity}
            </p>
            <p>
                ID: {job.id}
            </p>
            </CardBody>
            <ApplyButton username={user.username}
                         jobId={job.id}
                         jobsAppliedTo={user.applications}/>
        </Card>
        </section>
    );

};
export default JobCard;