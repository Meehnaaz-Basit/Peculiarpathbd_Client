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
    <div className="container mx-auto max-w-[1300px] w-[100%] lg-w[88%] px-0 pb-0 ">
      <div className="text-center py-10">
        <h2 className="font-pacifico text-teal-500 md:text-4xl text-2xl font-bold capitalize">
          all stories
        </h2>
      </div>
      <div className="grid  lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-8">
        {stories.map((story) => (
          <FourStoryCart story={story} key={story._id}></FourStoryCart>
        ))}
      </div>
    </div>
  );
};

export default AllStories;
