import React from "react";
import { Controller } from "react-hook-form";

const InputField = ({
  label,
  type = "text",
  value = "",
  onChange,
  error,
  required,
  control,
  name,
  defaultValue = "",
  ...props
}) => {
  return (
    <div className={`form__group ${error && "error"}`}>
      <label>
        {label}
        {required && <span>*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            value={field.value}
            onChange={field.onChange}
            {...props}
          />
        )}
      />
      {error && <span className="form__error">{error}</span>}
    </div>
  );
};

export default InputField;
