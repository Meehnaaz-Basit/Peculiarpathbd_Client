import React from "react";
import { useNavigate } from "react-router-dom";

const TourCat = ({ tourType }) => {
  const { _id, icon, lable, img } = tourType;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/packages/tour-type/${lable}`);
  };

  return (
    <div onClick={handleClick} className="carousel-item ">
      <article className="relative w-96  isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto my-10">
        <img
          src={img}
          alt="{lable}"
          className="absolute inset-0 h-full w-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <h3 className="z-10 mt-3 md:text-3xl text-lg font-bold text-white">
          {lable}
        </h3>
      </article>
    </div>
  );
};

export default TourCat;
