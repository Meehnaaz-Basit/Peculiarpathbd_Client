// import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import Button from "../button/Button";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // theme
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
      document.querySelector("html").setAttribute("data-theme", localTheme);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const handleToggle = (e) => {
    const newTheme = e.target.checked ? "night" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
  };
  // theme end

  const navRoute = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? " border-b-2 border-teal-700 text-teal-500 bg-transparent py-2 px-3 mx-2  font-bold"
            : "border-b-2 border-transparent  py-2 px-3 mx-2 font-bold hover:border-teal-500 hover:text-teal-500 hover:bg-transparent transition-all"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/community"
        className={({ isActive }) =>
          isActive
            ? " border-b-2 border-teal-700 text-teal-500 bg-transparent py-2 px-3 mx-2  font-bold"
            : "border-b-2 border-transparent  py-2 px-3 mx-2 font-bold  hover:text-teal-500 hover:bg-transparent transition-all"
        }
      >
        Community
      </NavLink>

      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          isActive
            ? " border-b-2 border-teal-700 text-teal-500 bg-transparent py-2 px-3 mx-2  font-bold"
            : "border-b-2 border-transparent  py-2 px-3 mx-2 font-bold  hover:text-teal-500 hover:bg-transparent transition-all"
        }
      >
        Blogs
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? " border-b-2 border-teal-700 text-teal-500 bg-transparent py-2 px-3 mx-2  font-bold"
            : "border-b-2 border-transparent  py-2 px-3 mx-2 font-bold  hover:text-teal-500 hover:bg-transparent transition-all"
        }
      >
        About Us
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? " border-b-2 border-teal-700 text-teal-500 bg-transparent py-2 px-3 mx-2  font-bold"
            : "border-b-2 border-transparent  py-2 px-3 mx-2 font-bold  hover:text-teal-500 hover:bg-transparent transition-all"
        }
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <div>
      {/* ****** */}
      <div className="navbar bg-base-100 px-0">
        <div className="navbar-start z-30">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navRoute}
            </ul>
          </div>
          <a
            href="/"
            className=" lg:text-4xl text-2xl flex gap-2 items-center font-bold font-pacifico text-teal-500"
          >
            <img
              src="https://i.ibb.co/kymMhSP/peculiar-path-bd-removebg-preview.png"
              alt="logo"
              className="md:w-20 w-12"
              style={{ animation: "spin 6s linear infinite" }}
            />
            PeculiarPathBD
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navRoute}</ul>
        </div>
        <div className="navbar-end">
          {/* Dropdown Menu */}
          {/* <div className="relative">
            <div className="flex flex-row items-center gap-3">
           
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu />
                <div className="hidden md:block">
                 
                  <img
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                    src={
                      user && user.photoURL
                        ? user.photoURL
                        : "https://i.ibb.co/3sR5k4Y/Pngtree-outline-user-icon-5045523.png"
                    }
                    alt="profile"
                    height="30"
                    width="30"
                  />
                </div>
              </div>
            </div>
            {isOpen && (
              <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                  <Link
                    to="/"
                    className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  >
                    Home
                  </Link>

                  {user ? (
                    <>
                      <div
                        onClick={logOut}
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div> */}
          {/* ======== */}
          {user ? (
            <>
              {/* <div>
                {user.photoURL ? (
                  <img
                    className="md:w-14 md:h-14 w-10 h-10 rounded-full border-2 object-cover "
                    title={user.displayName}
                    src={user.photoURL}
                    alt="Profile"
                  />
                ) : (
                  <img
                    className="md:w-14 md:h-14 w-10 h-10 rounded-full border-2  object-cover "
                    src="https://i.ibb.co/X3yrLFJ/pngegg.png"
                    alt=""
                  />
                )}
              </div>
              <div>
                <button onClick={logOut}>logOut</button>
              </div> */}
              {/*  */}
              <details className="dropdown dropdown-bottom dropdown-end z-30">
                <summary className="block py-2 ">
                  <div>
                    {user.photoURL ? (
                      <img
                        className="md:w-14 md:h-14 w-10 h-10 cursor-pointer rounded-full border-2 object-cover "
                        title={user.displayName}
                        src={user.photoURL}
                        alt="Profile"
                      />
                    ) : (
                      <img
                        className="md:w-14 md:h-14 w-10 h-10 rounded-full cursor-pointer border-2  object-cover "
                        src="https://i.ibb.co/X3yrLFJ/pngegg.png"
                        alt=""
                      />
                    )}
                  </div>
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-56">
                  <li className=" disabled cursor-pointer">
                    <p className="disabled ">{user?.displayName}</p>
                  </li>
                  <li className=" disabled cursor-pointer">
                    <p>{user?.email}</p>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={logOut}>Log Out</button>
                  </li>
                </ul>
              </details>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button buttonText="Login"></Button>
              </Link>
            </>
          )}
        </div>
        {/*  */}
        <a id="clickable" className="z-30 ml-3">
          {theme !== null && (
            <label className="cursor-pointer grid place-items-center">
              <input
                onChange={handleToggle}
                type="checkbox"
                checked={theme === "night"}
                // value="synthwave"
                className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
              />
              <svg
                className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg
                className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          )}
        </a>
        {/*  */}
      </div>
    </div>
  );
};

export default Navbar;
