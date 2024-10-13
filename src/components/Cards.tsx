import React from "react";
import Icon from "./Icon";

export const Cards = ({ classes, edit, setEdit, children }) => {
  return (
    <div className={"card " + classes}>
      {edit && (
        <button className="card__edit" onClick={() => setEdit(true)}>
          Edit <Icon id="edit" size={14} className="card__edit-icon" />
        </button>
      )}

      {children}
    </div>
  );
};
