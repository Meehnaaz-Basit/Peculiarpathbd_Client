import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./../../hooks/useAxiosCommon";
import { useEffect, useState } from "react";

import ListGuide from "./ListGuide";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const PackageSingleDetail = () => {
  const { user } = useAuth();
  console.log(user, "user in package detail page");
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const [startDate, setStartDate] = useState(new Date());
  const [previousLocation, setPreviousLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.from) {
      setPreviousLocation(location.state.from);
    }
  }, [location]);

  const axiosCommon = useAxiosCommon();
  const { data: packages = {}, isLoading } = useQuery({
    queryKey: ["packages", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/packages/${id}`);
      console.log(data);
      return data;
    },
  });

  const { data: tourGuides = {} } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/tourGuides");
      //   console.log(data);
      return data;
    },
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.target;

      const name = form.name.value;
      const email = form.email.value;
      const image = form.image.value;
      const packageName = form.packageName.value;
      const price = form.price.value;
      const date = form.date.value;
      const tourGuide = form.tourGuide.value;

      const bookings = {
        name,
        email,
        image,
        packageName,
        price,
        date,
        tourGuide,
      };
      // console.log(bookings);
      //
      const newBooking = await axiosCommon.post("/bookings", bookings);
      if (newBooking.data.insertedId) {
        // show success popup

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Booked Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return "Loading.....";

  const handleBackClick = () => {
    if (previousLocation) {
      navigate(previousLocation);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto shadow-lg px-4 py-8">
      <h2>{packages.title}</h2>
      {/*  */}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-4">
          {/* Case: 1 image */}
          {packages.spot_image.length === 1 && (
            <div className="w-full">
              <img
                src={packages.spot_image[0]}
                alt="Image 1"
                className="w-full h-96 object-cover rounded-lg shadow-md "
              />
            </div>
          )}

          {/* Case: 2 images */}
          {packages.spot_image.length === 2 && (
            <div className="flex gap-1 w-full">
              <div className="w-1/2">
                <img
                  src={packages.spot_image[0]}
                  alt="Image 1"
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="w-1/2">
                <img
                  src={packages.spot_image[1]}
                  alt="Image 2"
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          )}

          {/* Case: 3 images */}
          {packages.spot_image.length === 3 && (
            <div className="flex gap-1 w-full">
              <div className="w-1/2">
                <img
                  src={packages.spot_image[0]}
                  alt="Image 1"
                  className="w-full h-full object-cover  rounded-lg shadow-md"
                />
              </div>
              <div className="w-1/2">
                <div className="flex flex-wrap gap-1">
                  <div className="w-full">
                    <img
                      src={packages.spot_image[1]}
                      alt="Image 2"
                      className="w-full h-96 object-cover  rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full">
                    <img
                      src={packages.spot_image[2]}
                      alt="Image 3"
                      className="w-full h-96  object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Case: 4 images */}
          {packages.spot_image.length === 4 && (
            <div className="w-full flex justify-between gap-1">
              <div className="flex flex-wrap gap-1 w-1/2">
                {packages.spot_image.slice(0, 2).map((imageUrl, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 w-1/2">
                {packages.spot_image.slice(2, 4).map((imageUrl, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 3}`}
                      className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Case: 5 images */}
          {packages.spot_image.length === 5 && (
            <div className="flex w-full h-full gap-1">
              <div className="w-1/2 flex flex-col gap-1">
                {packages.spot_image.slice(0, 2).map((imageUrl, index) => (
                  <div key={index} className="flex-1">
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      className="w-full h-96 rounded-lg shadow-md object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="w-1/2 flex flex-col gap-1">
                <div className="flex-1">
                  <img
                    src={packages.spot_image[2]}
                    alt="Image 3"
                    className="w-full h-96  rounded-lg shadow-md object-cover"
                  />
                </div>
                <div className="flex flex-1 gap-1">
                  {packages.spot_image.slice(3, 5).map((imageUrl, index) => (
                    <div key={index} className="flex-1">
                      <img
                        src={imageUrl}
                        alt={`Image ${index + 4}`}
                        className="w-full h-96 rounded-lg shadow-md object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/*  */}
      <div className="max-w-4xl mx-auto">
        <div className="my-8">
          <h2 className="font-bold mb-6">About</h2>
          <p>{packages.aboutTour}</p>
        </div>
        <div>
          <h2 className="font-bold mb-6">Tour plans: </h2>
          {/* Days */}
          <div className="max-w-4xl mx-auto">
            {/* Map through days to render each day */}
            {packages.days.map((day, index) => (
              <div
                key={index}
                className="flex flex-row bg-white rounded-lg shadow-md border border-gray-200 mb-4"
              >
                {/* Day Number with Blue Background */}
                <div className="bg-blue-500 text-white py-2 px-4 ">
                  {day.dayNumber}
                </div>

                {/* Activities */}
                <div className="py-2 px-4">
                  <p>{day.activities}</p>
                </div>
              </div>
            ))}
          </div>
          {/* days end */}
        </div>
        {/* tour guide list */}
        <div className="py-8">
          <h2 className="font-bold mb-6">Tour Guide Lists</h2>
          <ListGuide></ListGuide>
        </div>
        {/* tour guide list */}
        {/* booking form */}
        <div>
          <div className="p-4 shadow-lg max-w-lg mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <Loader></Loader>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="card-body">
                {/* name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="input input-bordered"
                    required
                    defaultValue={user?.displayName}
                    disabled
                  />
                </div>
                {/* email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    required
                    defaultValue={user?.email}
                    disabled
                  />
                </div>
                {/* image */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Picture</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Image"
                    name="image"
                    className="input input-bordered"
                    required
                    defaultValue={user?.photoURL}
                    disabled
                  />
                </div>
                {/* package name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Package Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Package Name"
                    name="packageName"
                    className="input input-bordered"
                    required
                    defaultValue={packages.title}
                    disabled
                  />
                </div>
                {/* price */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Price"
                    name="price"
                    className="input input-bordered"
                    required
                    defaultValue={packages.price}
                    disabled
                  />
                </div>
                {/* tour date */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tour Date</span>
                  </label>
                  <DatePicker
                    selected={startDate}
                    name="date"
                    onChange={(date) => setStartDate(date)}
                    className="input input-bordered"
                    required
                  />
                </div>
                {/* tour guide name - drop-down */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tour Guide</span>
                  </label>
                  <select
                    name="tourGuide"
                    className="select select-bordered"
                    required
                  >
                    <option value="" disabled>
                      Select a tour guide
                    </option>
                    {tourGuides.map((guide) => (
                      <option
                        key={guide.id}
                        value={`${guide.name}, ${guide.email}`}
                      >
                        {guide.name} ({guide.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit button */}
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* booking form */}
      </div>
      <button className="btn btn-secondary" onClick={handleBackClick}>
        back
      </button>
    </div>
  );
};

export default PackageSingleDetail;
