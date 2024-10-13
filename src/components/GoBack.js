import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

export const GoBack = () => {
  return (
    <button onClick={() => window.history.back()} className="goback">
      <IoIosArrowRoundBack className="goback__icon" size="30" />
      Go Back
    </button>
  );
};
