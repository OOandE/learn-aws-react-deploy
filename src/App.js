import { useEffect } from "react";
import "./App.scss";
import SysRoutes from "./routes/Routes";
import "ag-grid-enterprise";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);
  return (
    <div>
      <SysRoutes />
    </div>
  );
}

export default App;
