import React, { useState } from "react";
import { Template } from "../components/Template.tsx";
import { useNavigate } from "react-router-dom";

export const UserTemplates = () => {
  const navigate = useNavigate();

  window.scrollTo(0, 0);
  const [userTemplates, setUserTemplates] = useState([
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
    <div>
      <button
        className="btn btn__primary btn--sm user__template-add"
        onClick={() => navigate("form")}
      >
        Add templates
      </button>
      <div className="template">
        {userTemplates.map((temp) => (
          <Template temp={temp} key={temp.id} showAction={true} />
        ))}
      </div>
    </div>
  );
};
