import React, { useCallback, useEffect, useState } from "react";
import CreateShiftModal from "../components/modals/CreateShiftModal.js";
import { getServiceUsers, getStaffMembers } from "../services/users.js";
import { AgGridReact } from "ag-grid-react";
import TableLink from "../components/TableLink.js";
import { Loader } from "../components/Loader.tsx";
import { getRotas } from "../services/rotas.js";
import { formatTime } from "../utils/functions.js";
import { format } from "date-fns";
import DateFilter from "../components/Forms/DateFilter.js";
import { BasicSelect } from "../components/Forms/BasicSelect.js";

export default function Rotas() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceUser, setServiceUsers] = useState(null);
  const [staff, setStaff] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "");
  const [rotas, setRotas] = useState([
    {
      id: 1,
      serviceUser: {
        firstName: "John",
        lastName: "Doe",
      },
      createdAt: new Date(),
      status: "Pending",
      shiftStart: "10:00",
      shiftEnd: "18:00",
      staff: {
        firstName: "John",
        lastName: "Doe",
      },
      serviceType: "Cleaning",
      clockIn: "10:00",
      clockOut: "18:00",
      duration: "00:00",
    },
  ]);
  const [staffOpt, setStaffOpt] = useState([]);
  const [serviceUserOpt, setServiceUserOpt] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedServiceUser, setSelectedServiceUser] = useState(null);
  const [rotasColumn, setRotasColumn] = useState([
    { field: "id", hide: true },
    // {
    //   headerName: "Action",
    //   cellRenderer: UserTableAction,
    //   // cellRenderer: "agGroupCellRenderer",
    //   width: 100,
    //   maxWidth: 100,
    // },
    {
      headerName: "Service user",
      valueGetter: (p) =>
        `${p.data?.serviceUser?.firstName} ${p.data?.serviceUser?.lastName}`,
      // cellRenderer: "agGroupCellRenderer",
      cellRenderer: (params) => TableLink(params, "/service-user/"),
    },
    {
      field: "createdAt",
      valueGetter: (p) => `${format(new Date(p.data.createdAt), "dd/MM/yyyy")}`,
    },
    { field: "status" },
    {
      field: "shiftStart",
      valueGetter: (p) => `${formatTime(p.data.shiftStart)}`,
    },
    {
      headerName: "End time",
      field: "shiftEnd",
      valueGetter: (p) => `${formatTime(p.data.shiftEnd)}`,
    },
    {
      headerName: "Clock in time",
      field: "clockInTime",
      valueGetter: (p) => `${formatTime(p.data.clockInTime)}`,
    },
    {
      headerName: "Clock out time",
      field: "clockOutTime",
      valueGetter: (p) => `${formatTime(p.data.clockOutTime)}`,
    },
    {
      headerName: "Staff",
      valueGetter: (p) =>
        `${p.data?.staff?.firstName} ${p.data?.staff?.lastName}`,
      cellRenderer: (params) => TableLink(params, "/team-user/"),
    },
    {
      field: "serviceType",
    },
  ]);

  const [disableFilterApply, setDisableFilterApply] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const handleDisableFilterButton = () => {
    if (
      dateRange !== null ||
      dateRange?.startDate === "" ||
      dateRange?.endDate === "" ||
      selectedStaff !== null ||
      selectedServiceUser !== null
    ) {
      setDisableFilterApply(false);
    } else {
      setDisableFilterApply(true);
    }
  };

  useEffect(() => {
    handleDisableFilterButton();
  }, [selectedStaff, selectedServiceUser, dateRange]);

  const getRowId = useCallback((params) => params.data.id, []);

  const fetchRotas = async () => {
    try {
      // const { data } = await getRotas();
      // setRotas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? "");
  }, []);

  const fetchServiceUser = async () => {
    try {
      const { data } = await getServiceUsers();
      setServiceUsers(data);
      if (data) {
        const options = data.map((user) => {
          return {
            label: `${user.firstName} ${user.lastName}`,
            value: user.id,
          };
        });
        setServiceUserOpt(options);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStaffMembers = async () => {
    try {
      const { data } = await getStaffMembers();
      setStaff(data);
      if (data) {
        const options = data.map((user) => {
          return {
            label: `${user.firstName} ${user.lastName}`,
            value: user.staffId,
          };
        });
        setStaffOpt(options);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchServiceUser(), fetchStaffMembers(), fetchRotas()]);
  }, []);
  const handleDateFilterChange = (range) => {
    if (range) {
      setDateRange(range);
      console.log("Start Date:", format(range.startDate, "dd-MM-yyyy"));
      console.log("End Date:", format(range.endDate, "dd-MM-yyyy"));
    } else {
      console.log("Custom range selected, awaiting dates...");
    }
  };

  const handleUserChange = (e, name) => {
    if (e) {
      setSelectedStaff(name === "staff" ? e.value : selectedStaff);
      setSelectedServiceUser(
        name === "serviceUser" ? e.value : selectedServiceUser
      );
    }
  };
  return (
    <>
      <div className="user__top">
        <div>
          <button
            className="btn btn__primary"
            onClick={() => setIsModalOpen(true)}
          >
            + Create shift
          </button>
        </div>
      </div>

      <div className="filter__container">
        <BasicSelect
          placeholder="Filter by staff"
          options={staffOpt}
          name="staff"
          onChange={(e) => handleUserChange(e, "staff")}
        />
        <BasicSelect
          placeholder="Filter by service user"
          options={serviceUserOpt}
          name="serviceUser"
          onChange={(e) => handleUserChange(e, "serviceUser")}
        />
        <DateFilter onFilterChange={handleDateFilterChange} />

        <div>
          <button
            className="btn btn--secondary"
            style={{ height: "37px" }}
            disabled={disableFilterApply}
          >
            Apply filter
          </button>
        </div>
      </div>
      <div
        className={
          theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
        } // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rotas}
          columnDefs={rotasColumn}
          masterDetail={true}
          // detailCellRenderer={detailCellRenderer}
          // detailCellRendererParams={hello}
          getRowId={getRowId}
          // onGridReady={getUser}
          loadingOverlayComponent={Loader}
        />
      </div>
      <CreateShiftModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        reload={() => {}}
        staffOpt={staffOpt}
        serviceUserOpt={serviceUserOpt}
      />
    </>
  );
}
