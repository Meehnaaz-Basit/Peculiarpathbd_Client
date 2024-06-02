import PropTypes from "prop-types";
import { HashLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      {/* <ScaleLoader size={100} color="red" /> */}

      <HashLoader color="#36d7b7" />
    </div>
  );
};

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
};

export default LoadingSpinner;
