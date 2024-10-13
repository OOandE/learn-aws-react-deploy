import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/lf30_editor_q1o4e5ak";

export default function Spinner() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="spinner_loader">
      <Lottie
        options={defaultOptions}
        width={250}
        height={"auto"}
        position={"absolute"}
        className={"lottie"}
      />
    </div>
  );
}
