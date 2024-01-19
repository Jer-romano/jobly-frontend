import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    CardTitle,
    CardText
  } from "reactstrap";

const CompanyCard = ({ company }) => {

    return (
        <section>
             <Card>
            <CardBody>
            <CardTitle>
               <Link to={`/companies/${company.handle}`}><b>{ company.name }</b>  </Link> 
            </CardTitle>
            <CardText>
                { company.description }
            </CardText>
            <p>
                Number of Employees: {company.numEmployees}
            </p>
            </CardBody>
        </Card>
        </section>
    );

};
export default CompanyCard;