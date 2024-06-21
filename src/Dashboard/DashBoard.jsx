import React from "react";
import useAuth from "../hooks/useAuth";

const DashBoard = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="flex flex-grow items-center justify-center h-screen -mt-10">
        <h1 className="text-center font-bold md:text-4xl text-2xl">
          Welcome{" "}
          <span className="font-pacifico text-teal-500">
            {user?.displayName}
          </span>{" "}
          to the Dashboard
        </h1>
      </div>
    </div>
  );
};

export default DashBoard;
