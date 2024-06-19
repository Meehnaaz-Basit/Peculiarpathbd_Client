import { Link } from "react-router-dom";
import Button from "../../../../../components/Shared/button/Button";
import { FaHeart } from "react-icons/fa";
import useAxiosCommon from "../../../../../hooks/useAxiosCommon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../../../hooks/useAuth";

const PackageCard = ({ item }) => {
  const { title, spot_image, price, tour_type, _id } = item;
  const firstImage = spot_image[0];

  const { user } = useAuth();
  console.log(user);

  // to do wishlist
  const axiosCommon = useAxiosCommon();
  const queryClient = useQueryClient();

  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch the wishlist items for the user
  // const { data: wishList = [] } = useQuery(["wishList", user], async () => {
  //   const { data } = await axiosCommon.get(`/wishList/${_id}`);
  //   return data;
  // });

  return (
    <Link to={`/packages/${_id}`}>
      <div className="card card-compact h-96 relative  bg-base-100 shadow-xl pb-3 md:mx-0 mx-2">
        <figure>
          <img
            className="hover:scale-125 w-full transition-all overflow-hidden h-60 object-cover"
            src={firstImage}
            alt={title}
          />
        </figure>
        <p className="absolute bg-orange-600 px-4 py-1 text-white rounded-tl rounded-br">
          {price}
        </p>
        <div className="card-body ">
          <h2 className="card-title font-pacifico text-teal-500 capitalize">
            {title}
          </h2>
          <p className="capitalize font-semibold ">Category: {tour_type}</p>
          <div className="card-actions justify-between">
            <div>
              <FaHeart className="text-xl" onClick={() => handleWish(_id)} />
            </div>
            <Link to={`/packages/${_id}`}>
              {" "}
              <Button buttonText="View Package"></Button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
