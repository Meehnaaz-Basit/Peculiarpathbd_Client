import { Link } from "react-router-dom";
import Button from "../../../../../components/Shared/button/Button";

const OurGuideTabCard = ({ tourGuide }) => {
  // const { user } = useAuth();
  const { _id, name, email, guide_image } = tourGuide;
  // const email = email || "No email available";

  const defaultImageUrl = "https://i.ibb.co/94MhXkN/6769264-60111.jpg";
  return (
    <div>
      <div className="card  bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            className=" overflow-hidden h-60 object-cover rounded-lg"
            src={guide_image || defaultImageUrl}
            alt={name}
            onError={(e) => {
              if (e.target.alt === name) {
                e.target.src = defaultImageUrl;
              }
            }}
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-teal-500 font-pacifico">{name}!</h2>
          <p>{email}</p>
          <div className="card-actions mt-6">
            <Link to={`/tourGuides/${_id}`}>
              <Button buttonText="Detail"></Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurGuideTabCard;
