import { Link } from "react-router-dom";

const ListGuideDesign = ({ tourGuide }) => {
  const { _id, name, profilePicture } = tourGuide;
  const defaultImageUrl = "https://i.ibb.co/94MhXkN/6769264-60111.jpg";
  return (
    <div className="flex gap-4 items-center">
      <Link to={`/tourGuides/${_id}`}>
        <div>
          <img
            src={profilePicture || defaultImageUrl}
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
          <h2>{name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default ListGuideDesign;
