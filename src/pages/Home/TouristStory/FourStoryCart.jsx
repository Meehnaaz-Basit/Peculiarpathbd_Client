import { Link } from "react-router-dom";

const FourStoryCart = ({ story }) => {
  const { _id, name, email, user_image, image, about } = story;
  return (
    <div>
      <Link to={`/usersStory/${_id}`}>
        <div className="flex flex-col items-center mb-5">
          <img
            src={image}
            alt=""
            className="w-56 h-56 border-8 border-green-500 rounded-lg object-cover "
          />
          <p className="font-pacifico font-semibold mt-2  text-teal-500">
            By: {name}
          </p>
        </div>
      </Link>
      <div></div>
    </div>
  );
};

export default FourStoryCart;
