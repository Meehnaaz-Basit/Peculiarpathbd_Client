import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const GuideProfileForm = ({ user }) => {
  const axiosCommon = useAxiosCommon();
  const { email, photoURL } = user;
  // console.log(user, "guide profile");
  const [isLoading, setIsLoading] = useState(false);

  const handleGuideProfile = async (e) => {
    e.preventDefault();
    // console.log("guide profile");
    // setIsLoading(true);
    const form = e.target;

    const guide_image = photoURL;
    const contact = [
      {
        number: form.number.value,
        address: form.address.value,
      },
    ];
    const education = [
      {
        degree: form.degree.value,
        institution: form.institution.value,
        yearOfCompletion: form.yearOfCompletion.value,
      },
    ];

    const skills = form.skills.value.split(",").map((skill) => skill.trim());

    const workExperience = [
      {
        position: form.position.value,
        company: form.company.value,
        duration: form.duration.value,
        responsibilities: form.responsibilities.value
          .split(",")
          .map((responsibility) => responsibility.trim()),
      },
    ];

    const updatedProfile = {
      guide_image,
      education,
      skills,
      workExperience,
      contact,
    };
    console.log(updatedProfile);

    try {
      const response = await axiosCommon.patch(
        `/users/${email}`,
        updatedProfile,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: response.data.message,
        });
        form.reset();
      } else if (response.status === 404) {
        Swal.fire({
          icon: "info",
          title: "Profile Not Updated",
          text: response.data.error,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Failed to update profile. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile. Please try again later.",
      });
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-4">
        <h2>Add Profile</h2>
      </div>

      <div>
        <div className="card flex mx-auto  shrink-0 w-full max-w-5xl shadow-2xl bg-base-100">
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Loader></Loader>
            </div>
          ) : (
            <form onSubmit={handleGuideProfile} className="card-body">
              <input type="hidden" name="guide_image" value={photoURL} />
              {/* contact */}
              <div className="grid lg:grid-cols-3 gap-2">
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="input input-bordered"
                    defaultValue={email}
                    disabled
                  />
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="number"
                    name="number"
                    placeholder="Your number"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your Address"
                    className="input input-bordered"
                  />
                </div>
              </div>

              {/* education */}
              <div className="grid lg:grid-cols-2 gap-3">
                <div>
                  <div>
                    {/* education */}
                    <label className="label">
                      <span className="label-text text-center mx-auto mt-3 font-bold">
                        Education
                      </span>
                    </label>
                    <div className="form-control ">
                      <label className="label">
                        <span className="label-text">Degree</span>
                      </label>
                      <input
                        type="text"
                        name="degree"
                        placeholder="Degree"
                        className="input input-bordered"
                        required
                      />
                    </div>

                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text">Institution</span>
                      </label>
                      <input
                        type="text"
                        name="institution"
                        placeholder="Institution"
                        className="input input-bordered"
                        required
                      />
                    </div>

                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text">Year of Completion</span>
                      </label>
                      <input
                        type="text"
                        name="yearOfCompletion"
                        placeholder="Year of Completion"
                        className="input input-bordered"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    {/* skills */}
                    <label className="label">
                      <span className="label-text text-center mx-auto mt-3 font-bold">
                        Skills
                      </span>
                    </label>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Skills (comma-separated)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="skills"
                        placeholder="Skills"
                        className="input input-bordered"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  {/* work experience */}
                  <label className="label">
                    <span className="label-text text-center mx-auto mt-3 font-bold">
                      Work Experiences
                    </span>
                  </label>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Position</span>
                    </label>
                    <input
                      type="text"
                      name="position"
                      placeholder="Position"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text">Company</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text">Duration</span>
                    </label>
                    <input
                      type="text"
                      name="duration"
                      placeholder="Duration"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text">
                        Responsibilities (comma-separated)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="responsibilities"
                      placeholder="Responsibilities"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  {isLoading ? "Updating..." : "Add to Profile"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideProfileForm;
