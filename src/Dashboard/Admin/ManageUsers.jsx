import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [disabledButtons, setDisabledButtons] = useState({});
  const [filter, setFilter] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/request");
      console.log(data);
      return data;
    },
  });

  // useEffect(() => {
  //   const newDisabledButtons = {};
  //   users.forEach((user) => {
  //     if (user.role === "admin" || user.role === "guide") {
  //       newDisabledButtons[user._id] = { makeAdmin: true, makeGuide: true };
  //     }
  //   });
  //   setDisabledButtons(newDisabledButtons);
  // }, [users]);

  useEffect(() => {
    //
    if (users.length > 0) {
      const newDisabledButtons = {};
      users.forEach((user) => {
        if (user.role === "admin" || user.role === "guide") {
          newDisabledButtons[user._id] = {
            makeAdmin: user.role === "admin",
            makeGuide: user.role === "guide",
          };
        }
      });
      setDisabledButtons(newDisabledButtons);
    }
  }, [users]);

  const handleMakeGuide = (user) => {
    Swal.fire({
      title: `Are you sure you want to make ${user.name} a Tour Guide?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Tour Guide!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/guide/${user._id}`)
          .then((res) => {
            if (res.data.message) {
              refetch();
              setDisabledButtons((prevState) => ({
                ...prevState,
                [user._id]: { makeAdmin: true, makeGuide: true },
              }));
              Swal.fire({
                title: `${user.name} is a Tour Guide now!`,
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "There was an error making the user a Tour Guide.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error making user a Tour Guide:", error);
            Swal.fire({
              title: "Error!",
              text: "There was an error making the user a Tour Guide.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Are you sure you want to make ${user.name} an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              setDisabledButtons((prevState) => ({
                ...prevState,
                [user._id]: { makeAdmin: true, makeGuide: true },
              }));

              Swal.fire({
                title: `${user.name} is an Admin now!`,
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error making user admin:", error);
            Swal.fire({
              title: "Error!",
              text: "There was an error making the user an admin.",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    {
      header: "Sl",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      cell: ({ row }) => (
        <td className="capitalize ">{row.original.role || "Tourist"}</td>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex flex-row gap-4 items-center justify-center">
          <div className="h-10 flex items-center text-center justify-center cursor-pointer">
            <button
              className="btn"
              onClick={() => handleMakeAdmin(row.original)}
              disabled={disabledButtons[row.original._id]?.makeAdmin}
            >
              Make Admin
            </button>
          </div>
          <div className="h-10 flex items-center text-center justify-center cursor-pointer">
            <button
              className="btn"
              onClick={() => handleMakeGuide(row.original)}
              disabled={disabledButtons[row.original._id]?.makeGuide}
            >
              Make Tour Guide
            </button>
          </div>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
  });

  if (isLoading) return "loading ....";

  return (
    <div>
      <h2>This is user management</h2>
      <div className="overflow-x-auto">
        <div>
          <div className="my-4 space-x-4">
            <span>Search by Name or Email</span>
            <input
              className="border-teal-500 border-b-2"
              type="text"
              value={filter}
              placeholder="  Search ..."
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div>{/* filter by role dropdown */}</div>
        </div>
        <table className="table border text-center">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-1 mt-6">
          <button className="btn btn-sm" onClick={() => table.setPageIndex(0)}>
            First page
          </button>
          <button
            className="btn btn-sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous page
          </button>
          <button
            className="btn btn-sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next page
          </button>
          <button
            className="btn btn-sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
