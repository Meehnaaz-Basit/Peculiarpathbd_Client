import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Shared/Footer/Footer";
const Main = () => {
  return (
    <div className="font-lato">
      <div className="container mx-auto max-w-[1300px] w-[100%] lg-w[88%] px-0 pb-0 ">
        <Navbar />
      </div>
      {/* container mx-auto max-w-[1300px] w-[100%] lg-w[88%] px-0 pb-0  */}

      <div className="">
        <Outlet />
      </div>
      {/* footer */}
      <div>
        <Footer></Footer>
      </div>
      <Toaster />
    </div>
  );
};

export default Main;
