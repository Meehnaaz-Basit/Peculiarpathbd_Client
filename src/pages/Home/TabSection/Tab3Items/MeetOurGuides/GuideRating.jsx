import Swal from "sweetalert2";
import useAuth from "../../../../../hooks/useAuth";

const GuideRating = () => {
  const { user } = useAuth();

  const handleRating = (e) => {
    e.preventDefault();
    // Example: Form validation logic
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;
    const photo = form.photo.value;
    const name = form.name.value;
    const email = form.email.value;

    const info = { rating, comment, photo, name, email };

    // Example: Submit logic (replace with your actual submission logic)
    console.log(info);
    Swal.fire({
      icon: "success",
      title: "Submission Successful!",
      text: "Thank you for your rating and comment.",
    });
    form.reset();
  };

  return (
    <div className="container max-w-3xl mx-auto my-4 p-6 bg-white shadow-lg rounded">
      <h1 className="font-pacifico text-teal-500 text-center text-2xl font-bold">
        Share Rating and Comment
      </h1>
      <form onSubmit={handleRating} className="card-body">
        <div className="form-control">
          <input
            type="text"
            name="photo"
            className="input input-bordered"
            defaultValue={user?.photoURL}
            hidden
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="input input-bordered"
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
            defaultValue={user?.email}
            disabled
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Give Rating</span>
          </label>
          <select
            name="rating"
            required
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Rating
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Share your Comment</span>
          </label>
          <textarea
            name="comment"
            className="textarea textarea-bordered"
            id="comment"
            required
            placeholder="Your Comment"
          ></textarea>
        </div>

        <div className="form-control mt-6">
          <button className="btn bg-teal-500 text-white" type="submit">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuideRating;
