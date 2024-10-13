import React from "react";
import icons from "../assets/icon-sprite.svg";

function Icon({
  width,
  height,
  id,
  className,
  onClick,
  size,
  disabled,
  color,
}) {
  return (
    <svg
      width={size ?? width}
      height={size ?? height}
      className={`${className ? className : ""} ${disabled ? "opacity-7" : ""}`}
      onClick={onClick}
      fill={color}
    >
      <use xlinkHref={`${icons}#${id}`} />
    </svg>
  );
}

export default Icon;
