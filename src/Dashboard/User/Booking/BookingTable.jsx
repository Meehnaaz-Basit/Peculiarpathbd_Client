import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

import Swal from "sweetalert2";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const BookingTable = ({ bookings, refetch }) => {
  // console.log(bookings, "data");
  const axiosCommon = useAxiosCommon();

  const renderActionButtons = (id, status) => {
    if (status === "In Review" || status === "Rejected") {
      return (
        <button onClick={() => handleCancel(id)} className="btn btn-sm">
          Cancel
        </button>
      );
    } else if (status === "Accepted") {
      return <button className="btn btn-sm">Pay</button>;
    } else {
      return null; // No action button for other statuses
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "In Review":
        return "text-yellow-600 font-semibold bg-yellow-100 rounded-lg";
      case "Rejected":
        return "text-red-600 bg-red-100 font-semibold rounded-lg";
      case "Accepted":
        return "text-green-600 bg-green-100 font-semibold rounded-lg";
      default:
        return "";
    }
  };

  const data = bookings || [];
  console.log(data, "table data");
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
      header: "Guide Name",
      accessorKey: "tourGuide",
      cell: ({ cell }) => {
        const tourGuide = cell.getValue();
        const guideName = tourGuide ? tourGuide.split(",")[0] : ""; // Check if tourGuide exists before splitting
        return guideName;
      },
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
      header: "Status",
      // accessorKey: "status",
      cell: ({ cell }) => {
        const status = cell.row.original.status;
        const statusClasses = getStatusClasses(status);
        return <span className={`py-1 px-2 ${statusClasses}`}>{status}</span>;
      },
    },
    {
      header: "Action",
      cell: ({ cell }) => {
        const { _id: id, status } = cell.row.original;
        return renderActionButtons(id, status);
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Do you want to cancel?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosCommon.delete(`/bookings/${id}`);
          console.log("Delete response:", res.data); // Log the response data
          if (res.data && res.data.deletedCount > 0) {
            refetch(); // Assuming refetch is a function passed as a prop to fetch updated data
            Swal.fire({
              title: "Canceled",
              text: "The booking has been canceled.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "No booking was deleted.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error cancelling booking:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while cancelling the booking.",
            icon: "error",
          });
        }
      }
    });
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

export default BookingTable;
