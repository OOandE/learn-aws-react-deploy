import React, { useState } from "react";
import Modal from "./Modal.tsx";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectField from "../Forms/SelectField.js";
import TimeSelect from "../TimeSelect.js";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  selectServiceUser: Yup.string().required("Service user is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  selectShiftType: Yup.string().required("Service list is required"),
  staffMember: Yup.string().required("Staff member is required"),
});

export default function CreateShiftModal({
  isModalOpen,
  setIsModalOpen,
  reload,
  serviceUserOpt,
  staffOpt,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const shiftTypeOpt = [
    {
      label: "Cleaning",
      value: "cleaning",
    },
    {
      label: "GP Appointment",
      value: "GP Appointment",
    },
    {
      label: "Shopping call",
      value: "shopping call",
    },
    {
      label: "Bedtime call",
      value: "bedtime call",
    },
  ];

  // Initialize React Hook Form with validation schema
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <Modal
      title="Create shift"
      onCancel={() => setIsModalOpen(false)}
      isOpen={isModalOpen}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="form__wrap">
        <SelectField
          label="Service user"
          options={serviceUserOpt}
          control={control}
          name="selectServiceUser"
          error={errors.selectServiceUser?.message}
          required
        />

        <SelectField
          label="Shift type"
          options={shiftTypeOpt}
          control={control}
          name="selectShiftType"
          error={errors.selectShiftType?.message}
          required
        />
        <SelectField
          label="Staff member"
          options={staffOpt}
          control={control}
          name="staffMember"
          error={errors.staffMember?.message}
          required
        />
        <Controller
          name="startTime"
          control={control}
          render={({ field }) => (
            <TimeSelect
              error={errors.startTime?.message}
              onTimeChange={field.onChange}
              label="Start time"
              required
            />
          )}
        />

        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <TimeSelect
              error={errors.endTime?.message}
              onTimeChange={field.onChange}
              label="End time"
              required
            />
          )}
        />
        <button type="submit" className="btn btn__primary" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </Modal>
  );
}
