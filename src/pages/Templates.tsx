import React, { useState } from "react";
import { Template } from "../components/Template.tsx";

export const Templates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      type: "healthAssessment",
      name: "Client Risk Assessment",
    },
    {
      id: 2,
      type: "healthAssessment",
      name: "Client Care Plan",
    },
  ]);
  return (
    <>
      <div className="template">
        {templates.map((temp) => (
          <Template temp={temp} key={temp.id} showAction={false} />
          // <Link to={`/template/${temp.id}`} key={temp.id}>
          //   <Cards classes="template__item">
          //     <h3>{temp.name}</h3>
          //     <p>{splitCamelCaseToWords(temp.type)}</p>
          //   </Cards>
          // </Link>
        ))}
      </div>
    </>
  );
};
