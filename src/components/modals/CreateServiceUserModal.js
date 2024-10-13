import React, { useState } from "react";
import Modal from "./Modal.tsx";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../Forms/InputField.js";
import SelectField from "../Forms/SelectField.js";
import { createServiceUser } from "../../services/users.js";
import toast from "react-hot-toast";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  ethnicity: Yup.string().required("Ethnicity is required"),
  startDate: Yup.date().required("Start date is required"),
  address: Yup.string().required("Address is required"),
  postalCode: Yup.string().required("Postcode is required"),
  telephoneNumber: Yup.string().required("Phone number is required"),
});

const CreateServiceUser = ({ isModalOpen, setIsModalOpen, reloadUsers }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize React Hook Form with validation schema
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await createServiceUser(data);
      toast.success("User created successfully");
      reloadUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  // Form schema configuration
  const userFormSchema = {
    sections: [
      {
        title: "User detail",
        fields: [
          {
            label: "First name",
            key: "firstName",
            type: "text",
            required: true,
          },
          {
            label: "Last name",
            key: "lastName",
            type: "text",
            required: true,
          },
          {
            label: "Gender",
            key: "gender",
            type: "select",
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ],
            required: true,
          },
          {
            label: "Date of birth",
            key: "dateOfBirth",
            type: "date",
            required: true,
          },
          {
            label: "Ethnicity",
            key: "ethnicity",
            type: "text",
            required: true,
          },
          {
            label: "Start date",
            key: "startDate",
            type: "date",
            required: true,
          },
        ],
      },
      {
        title: "Address details",
        fields: [
          {
            label: "Full address",
            key: "address",
            type: "text",
            required: true,
          },
          {
            label: "Postcode",
            key: "postalCode",
            type: "text",
            required: true,
          },
        ],
      },
      {
        title: "Contact details",
        fields: [
          {
            label: "Phone number",
            key: "telephoneNumber",
            type: "text",
            required: true,
          },
          {
            label: "Email address",
            key: "emailAddress",
            type: "email",
            required: false,
          },
        ],
      },
      {
        title: "Next of kin(NOK) details",
        fields: [
          {
            label: "NOK name",
            key: "nextOfKin",
            type: "text",
            required: false,
          },
          {
            label: "NOk contact number",
            key: "nextOfKinContactNumber",
            type: "text",
            required: false,
          },
        ],
      },
      {
        title: "Medical details",
        fields: [
          {
            label: "NFC Tag",
            key: "nfcTag",
            type: "text",
            required: false,
          },
          {
            label: "Pharmacy",
            key: "pharmacy",
            type: "text",
            required: false,
          },
          {
            label: "​GP practice",
            key: "gpPractice",
            type: "text",
            required: false,
          },
          {
            label: "​GP contact number",
            key: "gpContactNumber",
            type: "text",
            required: false,
          },
        ],
      },
    ],
  };

  // Render dynamic form fields using the `InputField` component
  const renderField = (sectionKey, field) => {
    const { label, key, type, options, required } = field;

    switch (type) {
      case "text":
      case "email":
      case "date":
        return (
          <InputField
            key={key}
            name={key}
            control={control}
            label={label}
            type={type}
            error={errors[key]?.message}
            required={required}
          />
        );

      case "select":
        return (
          <SelectField
            {...field}
            key={key}
            control={control}
            label={label}
            name={key}
            options={options}
            required={required}
            error={errors[key]?.message}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Modal
        title="Create service user"
        onCancel={handleCancel}
        isOpen={isModalOpen}
        size="xlg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {userFormSchema.sections.map((section) => (
            <div key={section.title} className="form__section">
              <h5>{section.title}</h5>
              <div className="form__section-wrap">
                {section.fields.map((field) =>
                  renderField(section.title, field)
                )}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="btn btn__primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Submit"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateServiceUser;
