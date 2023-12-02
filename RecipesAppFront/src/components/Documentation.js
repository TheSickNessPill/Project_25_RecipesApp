import React from "react";
import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";

import "swagger-ui-react/swagger-ui.css";

function Documentation(){
    const [doc, setSpec] = useState(undefined);

    useEffect(
        () => {
            const docFile = require("../swaggerApi.yaml",);
            setSpec(docFile);
        },
        []
    );

    return (
        <div className="doc-body">
            {doc ? <SwaggerUI spec={doc} /> : <p> Loading... </p>}
        </div>
    )
}

export default Documentation;