import { Link } from "react-router-dom";
import Button from "../../../../../components/Shared/button/Button";

const PackageCard = ({ item }) => {
  const { title, spot_image, price, tour_type, _id } = item;
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
          <div className="card-actions justify-end">
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
