import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

import Swal from "sweetalert2";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useEffect, useState } from "react";

const BookingTable = ({ bookings, refetch }) => {
  // console.log(bookings, "data");
  const axiosCommon = useAxiosCommon();
  const [discountApplied, setDiscountApplied] = useState(() => {
    // from localStorage on component mount
    return localStorage.getItem("discountApplied") === "true";
  });
  // Effect to save discountApplied to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("discountApplied", discountApplied);
  }, [discountApplied]);

  // State to track paid bookings
  const [paidBookings, setPaidBookings] = useState(() => {
    // Retrieve paid bookings from localStorage on component mount
    const storedPaidBookings = localStorage.getItem("paidBookings");
    return storedPaidBookings ? JSON.parse(storedPaidBookings) : [];
  });

  // Function to save paid bookings to localStorage
  const savePaidBookingsToLocalStorage = (paidBookings) => {
    localStorage.setItem("paidBookings", JSON.stringify(paidBookings));
  };

  const renderActionButtons = (id, status, packageName) => {
    const isPaid = paidBookings.includes(id);

    if (status === "In Review" || status === "Rejected") {
      return (
        <button onClick={() => handleCancel(id)} className="btn btn-sm">
          Cancel
        </button>
      );
    } else if (status === "Accepted") {
      if (isPaid) {
        return (
          <button className="btn btn-sm" disabled>
            Paid
          </button>
        );
      } else {
        return (
          <button
            className="btn btn-sm"
            onClick={() => handlePay(id, packageName)}
          >
            Pay
          </button>
        );
      }
    } else {
      return null;
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

  const handlePay = (id, packageName) => {
    Swal.fire({
      title: `Do you want to pay ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // console.log("Paid:", id);

          // Update local state and localStorage to mark booking as paid
          const updatedPaidBookings = [...paidBookings, id];
          setPaidBookings(updatedPaidBookings);
          savePaidBookingsToLocalStorage(updatedPaidBookings);

          // Show success message
          Swal.fire({
            title: "Paid!",
            text: `You have paid.`,
            icon: "success",
          });

          // Optionally refetch data after payment
          refetch();
        } catch (error) {
          console.error("Error paying:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while processing the payment.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleApply = () => {
    Swal.fire({
      title: `Do you want to Apply for Discount ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Apply!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Show success message
          Swal.fire({
            title: "Applied Discount!",
            text: `You got discount.`,
            icon: "success",
          });
          setDiscountApplied(true);
          refetch();
        } catch (error) {
          console.error("Error paying:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while processing the payment.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-end">
          {bookings.length > 3 ? (
            <div>
              <button
                onClick={handleApply}
                className="btn bg-teal-500 text-white m-2"
              >
                Apply
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
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
