import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      {/* footer */}
    </div>
  );
};

export default Main;
