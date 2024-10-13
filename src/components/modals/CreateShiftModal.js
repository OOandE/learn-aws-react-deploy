import React, { useEffect, useState } from "react";
import Modal from "./Modal.tsx";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../Forms/InputField.js";
import SelectField from "../Forms/SelectField.js";
import { Cards } from "../Cards.tsx";
import { fullName } from "../../utils/functions.js";
import TimeSelect from "../TimeSelect.js";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  selectServiceUser: Yup.string().required("Service user is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  selectServiceList: Yup.string().required("Service list is required"),
  staffMember: Yup.string().required("Staff member is required"),
});

export default function CreateShiftModal({
  isModalOpen,
  setIsModalOpen,
  reload,
  serviceUserOpt,
  staffOpt,
}) {
  const [selectedServiceUser, setSelectedServiceUser] = useState(null);
  const [serviceListOpt, setServiceListOpt] = useState([
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
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize React Hook Form with validation schema
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const selectServiceUser = watch("selectServiceUser");
  const startTime = watch("startTime");

  useEffect(() => {
    if (startTime) {
      console.log(startTime);
    }
  }, [startTime]);

  useEffect(() => {
    if (selectServiceUser) {
      setSelectedServiceUser(selectServiceUser);
    }
  }, [selectServiceUser]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleTimeChange = (time) => {
    console.log(time);
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

        {/* <Cards></Cards> */}

        <SelectField
          label="Service list"
          options={serviceListOpt}
          control={control}
          name="selectServiceList"
          error={errors.selectServiceList?.message}
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
