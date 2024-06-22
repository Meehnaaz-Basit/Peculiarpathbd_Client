import axios from "axios";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";

const AddPackages = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
  const [images, setImages] = useState([""]);
  const [days, setDays] = useState([{ dayNumber: "Day 01", activities: "" }]);
  const [formData, setFormData] = useState({
    aboutTour: "",
    tourType: "",
    tripTitle: "",
    price: "",
  });

  const handleAddImageField = () => {
    if (images.length < 5) {
      setImages([...images, ""]);
    }
  };

  const handleAddDayField = () => {
    if (days.length < 10) {
      setDays([
        ...days,
        { dayNumber: `Day ${days.length + 1}`, activities: "" },
      ]);
    }
  };

  const handleChangeImage = (index, value) => {
    const newImages = images.map((img, i) => (i === index ? value : img));
    setImages(newImages);
  };

  const handleChangeDay = (index, value) => {
    const newDays = days.map((day, i) =>
      i === index ? { ...day, activities: value } : day
    );
    setDays(newDays);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   e.preventDefault();
  //   const form = new FormData();
  //   images.forEach((image, index) => {
  //     form.append(`image_${index}`, image);
  //   });
  //   form.append("aboutTour", formData.aboutTour);
  //   form.append("tourType", formData.tourType);
  //   form.append("tripTitle", formData.tripTitle);
  //   form.append("price", formData.price);
  //   form.append("days", JSON.stringify(days));

  //   const { data } = await axios.post(
  //     `https://api.imgbb.com/1/upload?key=${
  //       import.meta.env.VITE_IMGBB_API_KEY
  //     }`,
  //     formData
  //   );
  //   console.log(data.data.display_url);

  //   // Console log the form data
  //   const data = {
  //     images,
  //     aboutTour: formData.aboutTour,
  //     tourType: formData.tourType,
  //     tripTitle: formData.tripTitle,
  //     price: formData.price,
  //     days,
  //   };
  //   console.log("Form Data:", data);

  //   //    try {
  //   //      const response = await axios.post(
  //   //        "https://peculiar-paths-bd-server.vercel.app/api/tours",
  //   //        form,
  //   //        {
  //   //          headers: {
  //   //            "Content-Type": "multipart/form-data",
  //   //          },
  //   //        }
  //   //      );
  //   //      console.log("Response:", response.data);
  //   //    } catch (error) {
  //   //      console.error("Error submitting the form:", error);
  //   //    }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create a new FormData instance to hold the images
      const formDataImages = new FormData();

      // Append images to the FormData
      images.forEach((image, index) => {
        formDataImages.append(`image_${index}`, image);
      });

      // Array to hold image URLs after uploading to imgbb
      const imageUrls = [];

      // Loop through images and upload each to imgbb
      for (let i = 0; i < images.length; i++) {
        if (images[i]) {
          const formImage = new FormData();
          formImage.append("image", images[i]);

          // Upload to imgbb
          const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMGBB_API_KEY
            }`,
            formImage
          );

          // Get URL from response and add to imageUrls array
          imageUrls.push(response.data.data.display_url);
        }
      }

      // Log the image URLs to verify
      console.log("Uploaded Image URLs:", imageUrls);

      // Create the final form data object to send to your backend
      const dataToSend = {
        spot_image: imageUrls,
        aboutTour: formData.aboutTour,
        tour_type: formData.tourType,
        title: formData.tripTitle,
        price: formData.price,
        days: days,
      };

      // Log the form data
      console.log("Form Data:", dataToSend);

      // Send data to the backend
      const newItem = await axiosCommon.post("/packages", dataToSend);
      console.log(newItem.data);

      if (newItem.data.insertedId) {
        // Reset form data to initial values
        setImages([""]);
        setDays([{ dayNumber: "Day 01", activities: "" }]);
        setFormData({
          aboutTour: "",
          tourType: "",
          tripTitle: "",
          price: "",
        });
        // show success popup

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${formData.tripTitle} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-center py-3">
        <h2 className="font-pacifico font-bold text-teal-500 text-3xl">
          Add packages
        </h2>
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            {/* <span className="loading loading-bars loading-lg"></span> */}
            <Loader></Loader>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-6 space-y-4 bg-base-200 rounded-lg"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Images:</span>
              </label>
              {images.map((img, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) =>
                      handleChangeImage(index, e.target.files[0])
                    }
                    className="file-input file-input-bordered w-full"
                  />
                </div>
              ))}
              {images.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddImageField}
                  className="btn btn-outline btn-accent w-min"
                >
                  + Add Image
                </button>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">About the Tour:</span>
              </label>
              <textarea
                name="aboutTour"
                required
                value={formData.aboutTour}
                onChange={handleChange}
                className="textarea textarea-bordered h-24 w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Tour Plans:</span>
              </label>
              {days.map((day, index) => (
                <div key={index} className="mb-2">
                  <label className="label-text">{day.dayNumber}:</label>
                  <textarea
                    required
                    value={day.activities}
                    onChange={(e) => handleChangeDay(index, e.target.value)}
                    className="textarea textarea-bordered w-full h-24"
                  />
                </div>
              ))}
              {days.length < 10 && (
                <button
                  type="button"
                  onClick={handleAddDayField}
                  className="btn btn-outline btn-accent w-min"
                >
                  + Add Day
                </button>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Tour Type:</span>
              </label>
              <select
                name="tourType"
                required
                value={formData.tourType}
                onChange={handleChange}
                className="select select-bordered"
              >
                <option value="">Select</option>
                <option value="mountain">Mountain</option>
                <option value="heritage">Heritage</option>
                <option value="adventure">Adventure</option>
                <option value="wildlife">Wildlife</option>
                <option value="beach">Beach</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Trip Title:</span>
              </label>
              <input
                type="text"
                required
                name="tripTitle"
                value={formData.tripTitle}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Price:</span>
              </label>
              <input
                type="number"
                required
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>

            <button
              type="submit"
              className="btn bg-teal-500 text-white w-full mt-4"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddPackages;
