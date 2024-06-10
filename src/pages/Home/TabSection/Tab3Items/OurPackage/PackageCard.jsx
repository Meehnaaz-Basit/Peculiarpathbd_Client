import { Link } from "react-router-dom";
import Button from "../../../../../components/Shared/button/Button";
import { FaHeart } from "react-icons/fa";

const PackageCard = ({ item }) => {
  const { title, spot_image, price, tour_type, _id } = item;
  const firstImage = spot_image[0];
  //wish list TODO*******

  return (
    <div>
      <div className="card card-compact h-96  bg-base-100 shadow-xl">
        <figure>
          <img
            className="hover:scale-125 w-full transition-all overflow-hidden h-60 object-cover"
            src={firstImage}
            alt={title}
          />
        </figure>
        <p className="absolute bg-pink-600 text-white">{price}</p>
        <div className="card-body ">
          <h2 className="card-title">{title}</h2>
          <p>{tour_type}</p>
          <div className="card-actions justify-between">
            <div>
              <FaHeart />
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
