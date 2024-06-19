import Swal from "sweetalert2";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAuth from "./../../hooks/useAuth";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";

const Request = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const [isLoading, setIsLoading] = useState(false);
  const [isRequested, setIsRequested] = useState(false); // New state to track request status

  const handleRequest = async (e) => {
    e.preventDefault();
    console.log("requested");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const info = { name, email };

    console.log(info);

    try {
      setIsLoading(true);
      // Send data to the backend
      const newItem = await axiosCommon.post("/request", info);
      console.log(newItem.data);

      if (newItem.data.insertedId) {
        setIsRequested(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Request sent successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg p-8 max-w-4xl mx-auto border-2 border-teal-500 rounded-lg">
        <form onSubmit={handleRequest} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="input input-bordered"
              required
              defaultValue={user?.displayName}
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="input input-bordered"
              required
              defaultValue={user?.email}
              disabled
            />
          </div>

          <div className="form-control mt-6">
            <button
              className="btn bg-teal-500 text-white"
              type="submit"
              disabled={isRequested}
            >
              {isRequested ? "Requested" : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Request;
