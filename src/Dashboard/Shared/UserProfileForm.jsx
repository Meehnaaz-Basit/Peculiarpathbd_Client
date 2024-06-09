import axios from "axios";

import useAxiosCommon from "../../hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";

const UserProfileForm = ({ user }) => {
  //   console.log(user);
  const { displayName, email, photoURL } = user;
  const axiosCommon = useAxiosCommon();
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const about = form.about.value;
    const user_image = form.user_image.value;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      // 1. Upload image and get image url
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      //   console.log(data.data.display_url);
      const storyInfo = {
        name: name,
        email: email,
        image: data.data.display_url,
        about: about,
        user_image: user_image,
      };
      console.log(storyInfo);
      axiosCommon.post("/usersStory", storyInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Story shared successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          form.reset();
        }
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-10 text-center">
      <div className="my-10">
        <h2>Share your Story</h2>
      </div>
      <div className="card flex mx-auto  shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader></Loader>
          </div>
        ) : (
          <form onSubmit={handleShare} className="card-body">
            <div className="form-control">
              <input
                type="text"
                name="user_image"
                placeholder="Your name"
                className="input input-bordered"
                required
                defaultValue={photoURL}
                disabled
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
                required
                defaultValue={displayName}
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
                defaultValue={email}
                disabled
              />
            </div>
            <div className="form-control">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Pick a image</span>
                </div>
                <input
                  type="file"
                  name="image"
                  required
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">About the story</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="About"
                  name="about"
                  required
                ></textarea>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Share</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfileForm;
