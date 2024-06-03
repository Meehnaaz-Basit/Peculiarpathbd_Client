import { Link } from "react-router-dom";
import Button from "../../../../../components/Shared/button/Button";
import { FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../../providers/AuthProvider";
import toast from "react-hot-toast";

const PackageCard = ({ item }) => {
  const { title, spot_image, price, tour_type, _id } = item;
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(AuthContext);
  const [isInWishlist, setIsInWishlist] = useState(
    wishlist.some((wish) => wish._id === _id)
  );

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(_id);
      setIsInWishlist(false);
      toast.error(`${title} 
       Removed from Wishlist`);
    } else {
      addToWishlist(item);
      setIsInWishlist(true);
      toast.success(`${title}
      Added to Wishlist`);
    }
  };

  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            className="hover:scale-125 transition-all overflow-hidden h-60 object-cover"
            src={spot_image}
            alt="Shoes"
          />
        </figure>
        <p className="absolute bg-pink-600 text-white">{price}</p>
        <div className="card-body ">
          <h2 className="card-title">{title}</h2>
          <p>{tour_type}</p>
          <div className="card-actions justify-between">
            <div onClick={handleToggleWishlist}>
              <FaHeart
                className={`text-2xl cursor-pointer ${
                  isInWishlist ? "text-red-500" : ""
                }`}
              />
            </div>
            <Link to={`/packages/${_id}`}>
              {" "}
              <Button buttonText="View Details"></Button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
