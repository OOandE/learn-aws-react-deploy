import React, { useCallback, useEffect, useState } from "react";
import "ag-grid-enterprise";

import { AgGridReact } from "ag-grid-react";
// import { TableLink } from "../TableLinks.tsx";
import { getServiceUsers } from "../../services/users.js";
import { format } from "date-fns";
import { Loader } from "../Loader.tsx";
import { UserTableAction } from "../UserTableAction.js";
// import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import CreateServiceUser from "../modals/CreateServiceUserModal.js";
import "ag-grid-charts-enterprise";
import TableLink from "../TableLink.js";
// import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
// import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
// import { MenuModule } from "@ag-grid-enterprise/menu";
// import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
// import { IAccount } from "./interfaces";

const UserSummary = () => {
  return <div>User summary</div>;
};

export const ServiceUsers = () => {
  const [usersList, setUsers] = useState(null);
  const usersColumn = [
    { field: "id", hide: true },
    {
      headerName: "Action",
      cellRenderer: UserTableAction,
      // cellRenderer: "agGroupCellRenderer",
      width: 100,
      maxWidth: 100,
    },
    {
      headerName: "Name",
      valueGetter: (p) => `${p.data.firstName} ${p.data.lastName}`,
      // cellRenderer: "agGroupCellRenderer",
      cellRenderer: (params) =>
        TableLink(params, "/service-user/", "serviceUser"),
    },
    { field: "typeOfUser" },
    {
      field: "dateOfBirth",
      valueGetter: (p) => `${format(p.data.dateOfBirth, "dd/MM/yyyy")}`,
    },
    { field: "ethnicity" },
    { field: "gender" },
    {
      field: "startDate",
      valueGetter: (p) => `${format(p.data.startDate, "dd/MM/yyyy")}`,
    },
    {
      headerName: "Address",
      valueGetter: (p) => `${p.data.address}, ${p.data.postCode}`,
    },
    { field: "telephoneNumber", headerName: "Phone number" },
    { field: "emailAddress", headerName: "Email" },
  ];
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const detailCellRenderer = useCallback(UserSummary, []);
  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? "");
  }, [theme]);

  const getRowId = useCallback((params) => params.data.id, []);

  const getUser = async () => {
    try {
      const { data } = await getServiceUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const hello = {};
  return (
    <div>
      <div className="user__top">
        <div>
          <button
            className="btn btn__primary"
            onClick={() => setIsModalOpen(true)}
          >
            + Add service user
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
          rowData={usersList}
          columnDefs={usersColumn}
          masterDetail={true}
          detailCellRenderer={detailCellRenderer}
          detailCellRendererParams={hello}
          getRowId={getRowId}
          onGridReady={getUser}
          loadingOverlayComponent={Loader}
        />
      </div>
      {isModalOpen && (
        <CreateServiceUser
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          reloadUsers={getUser}
        />
      )}
    </div>
  );
};
