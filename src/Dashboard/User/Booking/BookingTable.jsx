import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

const BookingTable = ({ bookings }) => {
  // console.log(bookings, "data");
  // const table = useReactTable({ data, column });

  // {"_id":"6666b31da992650cf996662e"},
  //   "name":"user2",
  // "email":"user2@gmail.com",
  // "image":"https://i.ibb.co/nj3mxDV/6769264-60111.jpg",
  // "packageName":"Mountain Adventure Tour",
  // "price":"1200","date":"06/26/2024",
  // "tourGuide":"Rahim Khan, rahim.khan@example.com"}

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
      // accessorKey: "price",
    },
    {
      header: "Action",
      // accessorKey: "price",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
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
