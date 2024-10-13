import React, { useEffect, useState } from "react";
import { Cards } from "../components/Cards.tsx";
import { useParams } from "react-router-dom";
import { getStaff } from "../services/users.js";
import {
  capitalize,
  dateDefaultValue,
  dateFormat,
  initials,
} from "../utils/functions.js";
import { TeamMemberType } from "../utils/types.ts";
import InputField from "../components/Forms/InputField.js";
import { useForm } from "react-hook-form";
import SelectField from "../components/Forms/SelectField.js";
import Spinner from "../components/PageLoader.js";

export const StaffDetails: React.FC = () => {
  const [editContact, setEditContact] = useState(false);
  const [editEmployment, setEditEmployment] = useState(false);
  const [user, setUser] = useState<TeamMemberType | null>(null);
  const urlParam = useParams();

  const fetchUser = async () => {
    try {
      const { data } = await getStaff(urlParam.id);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    const payload = {
      ...user,
      ...e,
    };
    console.log(payload);
  };

  return (
    <>
      {user ? (
        <div className="user-profile">
          <div className="profile-header profile-card">
            {/* <img
          src={user.profileImage}
          alt={fullName(user?.firstName, user?.lastName)}
          className="profile-image"
        /> */}
            <div className="profile-initial">
              {initials(user?.firstName, user?.lastName)}
            </div>

            <h5>{`${user?.firstName} ${user?.lastName}`}</h5>
          </div>

          <div className="profile-details">
            <Cards edit setEdit={() => setEditContact(!editContact)}>
              <h5>Personal information</h5>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="user-profile__form">
                  {!editContact ? (
                    <div className="form__group">
                      <label>Date of birth</label>
                      <p>
                        {dateFormat(user?.dateOfBirth, "do MMM, yyyy" || "--")}
                      </p>
                    </div>
                  ) : (
                    <InputField
                      defaultValue={dateDefaultValue(user?.dateOfBirth)}
                      name="dateOfBirth"
                      control={control}
                      label="Date of birth"
                      type="date"
                      error={errors["dateOfBirth"]?.message}
                    />
                    // <input type="text" value={user.contactDetails.phone} />
                  )}
                  {!editContact ? (
                    <div className="form__group">
                      <label>Phone</label>
                      <p>{user?.telephoneNumber}</p>
                    </div>
                  ) : (
                    <InputField
                      defaultValue={user?.telephoneNumber}
                      name="telephoneNumber"
                      control={control}
                      label="Phone number"
                      type="text"
                      error={errors["telephoneNumber"]?.message}
                    />
                    // <input type="text" value={user.contactDetails.phone} />
                  )}
                  <div>
                    {!editContact ? (
                      <div className="form__group">
                        <label>Email</label>
                        <p>{user?.emailAddress}</p>
                      </div>
                    ) : (
                      <InputField
                        defaultValue={user?.emailAddress}
                        name="emailAddress"
                        control={control}
                        label="Email"
                        type="email"
                        error={errors["emailAddress"]?.message}
                      />
                    )}
                  </div>
                  <div>
                    {!editContact ? (
                      <div className="form__group">
                        <label>Address</label>
                        <p>{user?.address}</p>
                      </div>
                    ) : (
                      <InputField
                        defaultValue={user?.address}
                        name="address"
                        control={control}
                        label="Address"
                        type="text"
                        error={errors["address"]?.message}
                      />
                    )}
                  </div>
                  <div>
                    {!editContact ? (
                      <div className="form__group">
                        <label>Postal code</label>
                        <p>{user?.postalCode}</p>
                      </div>
                    ) : (
                      <InputField
                        defaultValue={user?.postalCode}
                        name="postalCode"
                        control={control}
                        label="Postal code"
                        type="text"
                        error={errors["postalCode"]?.message}
                      />
                    )}
                  </div>
                  <div>
                    {!editContact ? (
                      <div className="form__group">
                        <label>Gender</label>
                        <p>{capitalize(user?.gender)}</p>
                      </div>
                    ) : (
                      <SelectField
                        control={control}
                        label="Gender"
                        name="gender"
                        defaultValue={user?.gender}
                        options={[
                          { label: "Male", value: "male" },
                          { label: "Female", value: "female" },
                          { label: "Other", value: "other" },
                        ]}
                        error={errors["gender"]?.message}
                      />
                    )}
                  </div>
                  <div>
                    {!editContact ? (
                      <div className="form__group">
                        <label>Ethnicity</label>
                        <p>{user?.ethnicity}</p>
                      </div>
                    ) : (
                      <InputField
                        defaultValue={user?.ethnicity}
                        name="ethnicity"
                        control={control}
                        label="Ethnicity"
                        type="text"
                        error={errors["ethnicity"]?.message}
                      />
                    )}
                  </div>
                  <div>
                    {!editContact ? (
                      <div className="form__group">
                        <label>Start date</label>
                        <p>
                          {dateFormat(user?.startDate, "do MMM, yyyy" || "--")}
                        </p>
                      </div>
                    ) : (
                      <InputField
                        defaultValue={dateDefaultValue(user?.startDate)}
                        name="startDate"
                        control={control}
                        label="Start date"
                        type="date"
                        error={errors["startDate"]?.message}
                      />
                      // <input type="text" value={user.contactDetails.phone} />
                    )}
                  </div>
                </div>

                {editContact && (
                  <button className="btn btn__primary">Save</button>
                )}
              </form>
            </Cards>

            <Cards edit setEdit={() => setEditEmployment(!editEmployment)}>
              <h5>Employment details</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="user-profile__form">
                  <div>
                    {!editEmployment ? (
                      <div className="form__group">
                        <label>Role</label>
                        <p>{user?.role || "-"}</p>
                      </div>
                    ) : (
                      <InputField
                        name="role"
                        control={control}
                        label="Role"
                        type="text"
                        error={errors["role"]?.message}
                      />
                      // <input type="text" value={user.contactDetails.phone} />
                    )}
                  </div>

                  <div>
                    {!editEmployment ? (
                      <div className="form__group">
                        <label>Manager</label>
                        <p>{user?.manager || "-"}</p>
                      </div>
                    ) : (
                      <InputField
                        name="manager"
                        control={control}
                        label="Manager"
                        type="text"
                        error={errors["manager"]?.message}
                      />
                    )}
                  </div>
                  <div>
                    {!editEmployment ? (
                      <div className="form__group">
                        <label>Permission</label>
                        <p>{user?.permission || "-"}</p>
                      </div>
                    ) : (
                      <InputField
                        name="permission"
                        control={control}
                        label="Permission"
                        type="text"
                        error={errors["permission"]?.message}
                      />
                    )}
                  </div>
                  <div>
                    {!editEmployment ? (
                      <div className="form__group">
                        <label>Login code</label>
                        <p>{user?.logincode || "-"}</p>
                      </div>
                    ) : (
                      <InputField
                        name="logincode"
                        control={control}
                        label="Login code"
                        type="text"
                        error={errors["logincode"]?.message}
                      />
                    )}
                  </div>
                </div>

                {editEmployment && (
                  <button className="btn btn__primary">Save</button>
                )}
              </form>
            </Cards>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
