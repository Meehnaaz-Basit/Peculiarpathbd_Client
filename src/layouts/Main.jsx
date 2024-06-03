import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
const Main = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      {/* footer */}
      <Toaster />
    </div>
  );
};

export default Main;
