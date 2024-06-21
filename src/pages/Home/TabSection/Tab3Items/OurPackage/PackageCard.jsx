import { Link } from "react-router-dom";
import Button from "../../../../../components/Shared/button/Button";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import useAxiosCommon from "../../../../../hooks/useAxiosCommon";
import { useState, useEffect } from "react";
import useAuth from "../../../../../hooks/useAuth";
import Swal from "sweetalert2";

const PackageCard = ({ item }) => {
  const { title, spot_image, price, tour_type, _id } = item;
  const firstImage = spot_image[0];

  const { user } = useAuth();

  const axiosCommon = useAxiosCommon();
  const [isWishListed, setIsWishListed] = useState(false);

  // Check if the current item is already in the wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const { data } = await axiosCommon.get(`/wishList/${user?.email}`);
        setIsWishListed(data.exists);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    if (user) {
      checkWishlist();
    }
  }, [axiosCommon, user, _id]);

  // Handle adding/removing from wishlist
  const handleWish = async () => {
    if (!user) {
      // User not logged in, show alert
      Swal.fire(
        "Login Required",
        "You need to log in to add items to your wishlist.",
        "error"
      );
      return;
    }

    try {
      const { data } = await axiosCommon.post(`/wishList/${user?.email}`, {
        itemId: _id,
        title: title,
      });

      // Handle success
      setIsWishListed(true);
      Swal.fire("Success!", data.message, "success");
    } catch (error) {
      console.error("Error adding to wishlist:", error);

      if (error.response && error.response.status === 400) {
        // Item already saved in wishlist
        Swal.fire("Oops!", error.response.data.message, "error");
      } else {
        // Other errors
        Swal.fire("Oops!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="relative">
      <Link to={`/packages/${_id}`}>
        <div className="card card-compact h-96 relative bg-base-100 shadow-xl pb-3 md:mx-0 mx-2">
          <figure>
            <img
              className="hover:scale-125 w-full transition-all overflow-hidden h-60 object-cover"
              src={firstImage}
              alt={title}
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title font-pacifico text-teal-500 capitalize">
              {title}
            </h2>
            <div className="flex justify-between mb-6">
              <span className="capitalize font-semibold">
                Category: {tour_type}
              </span>
              <span className="font-semibold"> Price: {price} TK</span>
            </div>
            <div className="card-actions justify-between">
              <Link to={`/packages/${_id}`}>
                <Button buttonText="View Package"></Button>
              </Link>
            </div>
          </div>
        </div>
      </Link>
      <div className="bg-white border-4 border-teal-500 rounded-full p-4 inline-block absolute top-20 left-1/2 transform -translate-x-1/2">
        {isWishListed ? (
          <FaHeart
            onClick={() => handleWish(_id)}
            className="text-red-500 text-4xl cursor-pointer"
          />
        ) : (
          <FaRegHeart
            onClick={() => handleWish(_id)}
            className="text-teal-500 text-4xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PackageCard;
