import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosCommon = useAxiosCommon();
  const {
    data: users = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/users");
      //   console.log(data);
      return data;
    },
  });

  //
  const handleMakeGuide = (user) => {
    Swal.fire({
      title: `Are you sure you want to make ${user.name} an Tour Guide?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Tour Guide!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosCommon
          .patch(`/users/guide/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: `${user.name} is a Tour Guide now!`,
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
  //
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
        axiosCommon
          .patch(`/users/admin/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
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

  return (
    <div>
      <h2>this is user management</h2>
      <div>
        <h1>Wishlist</h1>
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table text-center">
              {/* head */}
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <div className="flex flex-row gap-4 items-center justify-center">
                        <div className=" h-10  flex items-center text-center justify-center cursor-pointer  ">
                          {item.role === "admin" ? (
                            "Admin"
                          ) : (
                            <button
                              className="btn "
                              onClick={() => handleMakeAdmin(item)}
                            >
                              Make Admin
                            </button>
                          )}
                        </div>
                        <div className=" h-10  flex items-center text-center justify-center  cursor-pointer  ">
                          {item.role === "guide" ? (
                            "Tour Guide"
                          ) : (
                            <button
                              className="btn "
                              onClick={() => handleMakeGuide(item)}
                            >
                              Make Tour Guide
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No items in your wishlist</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
