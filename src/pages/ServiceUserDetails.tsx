import React, { useEffect, useMemo, useState } from "react";
import { Cards } from "../components/Cards.tsx";
import { splitCamelCaseToWords } from "../utils.ts";
import { useParams, useNavigate } from "react-router-dom";
import noTextLogo from "../assets/images/no-text-logo.svg";
import { getServiceUser } from "../services/users.js";
import { dateFormat, initials } from "../utils/functions.js";
import { ServiceUserType } from "../utils/types.ts";
import InputField from "../components/Forms/InputField.js";
import { useForm } from "react-hook-form";
import SelectField from "../components/Forms/SelectField.js";
import Spinner from "../components/PageLoader.js";

export const ServiceUserDetails: React.FC = () => {
  const [editContact, setEditContact] = useState(false);
  const [editMedical, setEditMedical] = useState(false);
  const [editNextKin, setEditNextKin] = useState(false);
  const [user, setUser] = useState<ServiceUserType | null>(null);
  const urlParam = useParams();

  const fetchUser = async () => {
    try {
      const { data } = await getServiceUser(urlParam.id);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    console.log(e);
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
                        name="email"
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
                        <p>{user?.gender}</p>
                      </div>
                    ) : (
                      <SelectField
                        control={control}
                        label="Gender"
                        name="gender"
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

            {/* <Cards>
          <h5>Health Conditions</h5>
          <ul>
            {user.healthConditions.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        </Cards> */}

            <Cards edit setEdit={() => setEditMedical(!editMedical)}>
              <h5>Medical Details</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="user-profile__form">
                  {!editMedical ? (
                    <div className="form__group">
                      <label>GP practice</label>
                      <p>{user?.gpPractice || "-"}</p>
                    </div>
                  ) : (
                    <InputField
                      name="gpPractice"
                      control={control}
                      label="GP practice"
                      type="text"
                      error={errors["gpPractice"]?.message}
                    />
                    // <input type="text" value={user.contactDetails.phone} />
                  )}
                  <div>
                    {!editMedical ? (
                      <div className="form__group">
                        <label>GP contact number</label>
                        <p>{user?.gpContactNumber || "-"}</p>
                      </div>
                    ) : (
                      <InputField
                        name="gpContactNumber"
                        control={control}
                        label="GP contact number"
                        type="text"
                        error={errors["gpContactNumber"]?.message}
                      />
                    )}
                  </div>
                  <div>
                    {!editMedical ? (
                      <div className="form__group">
                        <label>Pharmacy</label>
                        <p>{user?.pharmacy || "-"}</p>
                      </div>
                    ) : (
                      <InputField
                        name="pharmacy"
                        control={control}
                        label="Pharmacy"
                        type="text"
                        error={errors["pharmacy"]?.message}
                      />
                    )}
                  </div>
                  <div>
                    {!editMedical ? (
                      <div className="form__group">
                        <label>NFC Tag</label>
                        <p>{user?.nfcTag || "-"}</p>
                      </div>
                    ) : (
                      <InputField
                        name="nfcTag"
                        control={control}
                        label="NFC Tag"
                        type="text"
                        error={errors["nfcTag"]?.message}
                      />
                    )}
                  </div>
                </div>

                {editMedical && (
                  <button className="btn btn__primary">Save</button>
                )}
              </form>
            </Cards>

            <Cards edit setEdit={() => setEditNextKin(!editNextKin)}>
              <h5>Next of kin</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="user-profile__form">
                  {!editNextKin ? (
                    <div className="form__group">
                      <label>Name</label>
                      <p>{user?.nextOfKin || "-"}</p>
                    </div>
                  ) : (
                    <InputField
                      name="nextOfKin"
                      control={control}
                      label="Name"
                      type="text"
                      error={errors["nextOfKin"]?.message}
                    />
                    // <input type="text" value={user.contactDetails.phone} />
                  )}
                  <div>
                    {!editNextKin ? (
                      <div className="form__group">
                        <label>Phone number</label>
                        <p>{user?.nextOfKinContactNumber || "-"}</p>
                      </div>
                    ) : (
                      <InputField
                        name="nextOfKinContactNumber"
                        control={control}
                        label="Phone number"
                        type="text"
                        error={errors["nextOfKinContactNumber"]?.message}
                      />
                    )}
                  </div>
                </div>

                {editNextKin && (
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
