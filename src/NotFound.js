import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";

function NotFound() {

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {"Hmmm, I can't seem to find what you want."}
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default NotFound;