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

  return (
    <div className="py-20">
      <h2>this is story section</h2>
      <div className="grid grid-cols-4 gap-6 mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-min">
            <Loader></Loader>
          </div>
        ) : (
          stories
            .slice(0, 4)
            .map((story) => (
              <FourStoryCart story={story} key={story._id}></FourStoryCart>
            ))
        )}
      </div>
      <div className="flex justify-center mt-20">
        <Link to="/usersStory">
          <Button buttonText="All Stories"></Button>
        </Link>
      </div>
    </div>
  );
};

export default StorySection;
