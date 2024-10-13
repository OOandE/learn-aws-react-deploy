import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

export const UserTableAction = (params) => {
  return (
    <div className="user__table-action">
      <button>
        <RiDeleteBin3Line className="user__table-action--icon" size="20" />
      </button>
      <button>
        <FaRegEdit className="user__table-action--icon" size="20" />
      </button>
    </div>
  );
};
