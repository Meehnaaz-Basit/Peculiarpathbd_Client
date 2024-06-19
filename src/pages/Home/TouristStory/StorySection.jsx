import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import FourStoryCart from "./FourStoryCart";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom";
import Button from "../../../components/Shared/button/Button";

const StorySection = () => {
  const axiosCommon = useAxiosCommon();
  const { data: stories = {}, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/usersStory");
      console.log(data);
      return data;
    },
  });

  if (isLoading || !stories.length) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className=" text-center">
        <h2 className="font-bold font-pacifico text-3xl text-teal-500">
          Tourist Stories
        </h2>
      </div>

      <div className=" p-8 max-w-6xl mx-auto shadow-lg">
        <div className=" flex flex-col items-center text-center justify-center space-y-6 ">
          <h1 className="font-pacifico text-teal-500 font-bold text-3xl">
            Moments of Our Satisfied Tourist
          </h1>
          <p>
            Experience the magic of our destinations through the eyes of our
            satisfied travelers. From breathtaking landscapes to culturally rich
            experiences, each moment captured reflects the essence of
            exploration and discovery.
          </p>
        </div>
        <div className="grid lg:grid-cols-4 mt-8">
          {stories.slice(0, 4).map((story) => (
            <FourStoryCart story={story} key={story._id}></FourStoryCart>
          ))}
        </div>
        <div className="flex justify-center mt-20">
          <Link to="/usersStory">
            <Button buttonText="All Stories"></Button>
          </Link>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default StorySection;
