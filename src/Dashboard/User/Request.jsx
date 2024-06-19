import useAuth from "./../../hooks/useAuth";

const Request = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-center items-center  h-screen">
      <div className=" shadow-lg p-8 max-w-4xl mx-auto  ">
        <form className="card-body">
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
            <button className="btn btn-primary">send request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Request;
