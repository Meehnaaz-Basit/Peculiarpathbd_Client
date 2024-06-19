import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const AssignedTourTable = ({ assignTour, refetch }) => {
  const data = assignTour || [];
  console.log(data, "table data");
  const [updatedData, setUpdatedData] = useState([]);
  const axiosCommon = useAxiosCommon();
  const columns = [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Package Name",
      accessorKey: "packageName",
    },
    {
      header: "Tourist Name",
      accessorKey: "name",
    },
    {
      header: "Tour Date",
      accessorKey: "date",
    },
    {
      header: "Tour Price",
      accessorKey: "price",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <button
            className={`p-3 font-bold rounded-xl btn ${
              row.original.status === "Accepted"
                ? "bg-green-100 text-green-600"
                : ""
            }`}
            onClick={() => handleAccept(row.original._id)}
            // disabled={row.original.status === "Accepted"}
          >
            Accept
          </button>
          <button
            className={` p-3 font-bold btn rounded-xl ${
              row.original.status === "Rejected"
                ? "bg-red-100 text-red-600"
                : ""
            }`}
            onClick={() => handleReject(row.original._id)}
            // disabled={row.original.status === "Rejected"}
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleAccept = async (id) => {
    try {
      const response = await axiosCommon.patch(
        `http://localhost:5000/bookings/${id}/status`,
        { status: "Accepted" }
      );
      if (response.status === 200) {
        const updatedBooking = response.data;
        const updatedList = data.map((item) =>
          item._id === updatedBooking._id ? updatedBooking : item
        );
        setUpdatedData(updatedList);
        refetch();
      } else {
        console.error("Failed to update booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleReject = async (id) => {
    console.log("rejected");
    try {
      const response = await axiosCommon.patch(
        `http://localhost:5000/bookings/${id}/status`,
        { status: "Rejected" }
      );
      if (response.status === 200) {
        const updatedBooking = response.data;
        const updatedList = data.map((item) =>
          item._id === updatedBooking._id ? updatedBooking : item
        );
        setUpdatedData(updatedList);
        refetch();
      } else {
        console.error("Failed to update booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table border">
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
        {/*  */}
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

export default AssignedTourTable;
