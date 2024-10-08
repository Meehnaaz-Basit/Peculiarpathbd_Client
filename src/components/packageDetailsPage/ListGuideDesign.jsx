import { Link } from "react-router-dom";

const ListGuideDesign = ({ tourGuide }) => {
  const { _id, name, guide_image } = tourGuide;
  const defaultImageUrl = "https://i.ibb.co/94MhXkN/6769264-60111.jpg";
  return (
    <div className="flex gap-4 items-center ">
      <Link to={`/tourGuides/${_id}`}>
        <div className="flex flex-col items-center">
          <div>
            <img
              src={guide_image || defaultImageUrl}
              className="w-20 h-20 rounded-full object-cover"
              alt=""
              onError={(e) => {
                if (e.target.alt === name) {
                  e.target.src = defaultImageUrl;
                }
              }}
            />
          </div>
          <div>
            <h2 className="text-lg text-teal-500">{name}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListGuideDesign;
