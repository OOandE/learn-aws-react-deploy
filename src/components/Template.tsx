import React from "react";
import { Cards } from "./Cards.tsx";
import { Link } from "react-router-dom";
import { splitCamelCaseToWords } from "../utils.ts";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { IoDuplicateOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import noTextLogo from "../assets/images/no-text-logo.svg";

export const Template = ({ temp, showAction }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Cards classes="template__item">
        <Link to={`/template/${temp.id}`} className="template__item-link">
          <h5>{temp.name}</h5>
          <p>{splitCamelCaseToWords(temp.type)}</p>
        </Link>
        {showAction && (
          <div className="user__template-action">
            <div>
              <RiDeleteBin3Line className="user__template-action--icon" />
              <span>Delete</span>
            </div>
            <div onClick={() => navigate("form")}>
              <FaRegEdit className="user__template-action--icon" />
              <span>Edit</span>
            </div>
            <div>
              <IoDuplicateOutline className="user__template-action--icon" />
              <span>Duplicate</span>
            </div>
          </div>
        )}
      </Cards>
    </div>
  );
};
