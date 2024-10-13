import React from "react";
import DatePicker from "react-datepicker";

const CustomInput = React.forwardRef(
  ({ value, onClick, height, placeholder }, ref) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      readOnly
      ref={ref}
      placeholder={placeholder}
      style={{ height }}
    />
  )
);

export const BasicDatePicker = ({
  onChange,
  value = null,
  height = "30px",
  placeholder = "Select Date",
  ...props
}) => {
  return (
    <div className="form__input">
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        customInput={<CustomInput height={height} />}
        {...props}
      />
    </div>
  );
};
