import { useNavigate } from "react-router-dom";

const TourTypeIconBox = ({ tourType }) => {
  const { _id, icon, lable, img } = tourType;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/packages/tour-type/${lable}`);
  };

  return (
    <div onClick={handleClick}>
      <div className="flex flex-col text-center items-center p-8 shadow-md w-44 cursor-pointer">
        <img src={icon} className="w-20 object-cover" alt="" />
        <h1 className="uppercase font-bold text-2xl">{lable}</h1>
      </div>
    </div>
  );
};

export default TourTypeIconBox;
