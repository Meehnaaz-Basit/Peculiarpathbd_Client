import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import FourStoryCart from "./FourStoryCart";

const AllStories = () => {
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
    <div>
      <h2>all stories</h2>
      <div className="grid grid-cols-4 gap-8">
        {stories.map((story) => (
          <FourStoryCart story={story} key={story._id}></FourStoryCart>
        ))}
      </div>
    </div>
  );
};

export default AllStories;
