import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyWishlist = () => {
  const { user } = useAuth();

  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const {
    data: wishList = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishList"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/wishList/${user?.email}`);
      console.log(data, "data wish");
      return data;
    },
  });

  const data = wishList || [];
  // console.log(data, "table data");
  const columns = [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Package Name",
      accessorKey: "title",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/packages/${row.original.itemId}`}>
            <button
              className="btn btn-sm"
              onClick={() => handleViewDetail(row.original._id)}
            >
              View Detail
            </button>
          </Link>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.original._id)}
          >
            Delete
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

  const handleDelete = (id) => {
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
          const res = await axiosCommon.delete(`/wishList/${id}`);
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
    console.log("delete", id);
  };
  // detail
  const handleViewDetail = () => {
    console.log("detail");
  };
  return (
    <div>
      <div className="overflow-x-auto max-w-5xl mx-auto">
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

export default MyWishlist;
