import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { BsSendFill } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { RiReservedFill } from "react-icons/ri";
import { FaHeart, FaHome, FaPlus, FaUser } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";
import useGuide from "../../hooks/useGuide";

const Sidebar = () => {
  const { logOut, user } = useAuth();
  const [isActive, setActive] = useState(false);

  const [isAdmin] = useAdmin();
  const [isGuide] = useGuide();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              {/* <img
                // className='hidden md:block'
                src="https://i.ibb.co/4ZXzmq5/logo.png"
                alt="logo"
                width="100"
                height="100"
              /> */}
              <h2>PeculiarPathBD</h2>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center  mx-auto">
              <Link to="/">
                {/* <img
                  // className='hidden md:block'
                  src="https://i.ibb.co/4ZXzmq5/logo.png"
                  alt="logo"
                  width="100"
                  height="100"
                /> */}
                <h2>PeculiarPathBD</h2>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            <nav>
              {isAdmin ? (
                <>
                  {/* Admin Items */}
                  {/* Statistics */}
                  <NavLink
                    to="/dashboard/myProfile"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <CgProfile className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Profile</span>
                  </NavLink>

                  {/* Add Room */}
                  <NavLink
                    to="/dashboard/admin/addPackage"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <FaPlus className="w-5 h-5" />

                    <span className="mx-4 font-medium">Add Packages</span>
                  </NavLink>
                  {/* My Listing */}
                  <NavLink
                    to="/dashboard/admin/manageUser"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <FaUser className="w-5 h-5" />

                    <span className="mx-4 font-medium">Manage User</span>
                  </NavLink>
                </>
              ) : isGuide ? (
                <>
                  {/* Guide Items */}
                  <NavLink
                    to="/dashboard/myProfile"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <CgProfile className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Profile</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/guide/myAssignTours"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <CgProfile className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Assigned Tours </span>
                  </NavLink>
                </>
              ) : (
                <>
                  {/* User Items */}
                  <NavLink
                    to="/dashboard/myProfile"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <CgProfile className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Profile</span>
                  </NavLink>

                  {/* booking */}
                  <NavLink
                    to={`/dashboard/myBookings/${user?.email}`}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <RiReservedFill className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Bookings</span>
                  </NavLink>
                  {/* My Listing */}
                  <NavLink
                    to="/dashboard/myWishlist"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <FaHeart className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Wishlist</span>
                  </NavLink>
                  {/*  */}
                  <NavLink
                    to="/dashboard/request"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <BsSendFill className="w-5 h-5" />

                    <span className="mx-4 font-medium">Request Admin</span>
                  </NavLink>
                </>
              )}
            </nav>

            {/*  Menu Items */}
            {/* <nav>
              {isAdmin ? (
                <>
                 
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <CgProfile className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Profile</span>
                  </NavLink>

                
                  <NavLink
                    to="/dashboard/admin/addPackage"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <FaPlus className="w-5 h-5" />

                    <span className="mx-4 font-medium">Add Packages</span>
                  </NavLink>
                  
                  <NavLink
                    to="/dashboard/admin/manageUser"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <FaUser className="w-5 h-5" />

                    <span className="mx-4 font-medium">Manage User</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard/myProfile"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <CgProfile className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Profile</span>
                  </NavLink>

                  
                  <NavLink
                    to="myBookings"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <RiReservedFill className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Bookings</span>
                  </NavLink>
                 
                  <NavLink
                    to="/dashboard/myWishlist"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <FaHeart className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Wishlist</span>
                  </NavLink>
                 
                  <NavLink
                    to="requestAdmin"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <BsSendFill className="w-5 h-5" />

                    <span className="mx-4 font-medium">Request Admin</span>
                  </NavLink>
                </>
              )}
            </nav> */}
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <FaHome className="w-5 h-5" />

            <span className="mx-4 font-medium">Home</span>
          </NavLink>
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <Link to="/">
              <span className="mx-4 font-medium" onClick={logOut}>
                Logout
              </span>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
