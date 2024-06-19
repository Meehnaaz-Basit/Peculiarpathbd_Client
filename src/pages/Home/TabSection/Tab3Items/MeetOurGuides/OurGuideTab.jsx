import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../../hooks/useAxiosCommon";
import OurGuideTabCard from "./OurGuideTabCard";
import Loader from "../../../../../components/Loader/Loader";

const OurGuideTab = () => {
  const axiosCommon = useAxiosCommon();
  const { data: tourGuides = {}, isLoading } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/tourGuides");
      //   console.log(data);
      return data;
    },
  });
  // console.log(packages);

  if (isLoading)
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:mx-0 mx-3">
        {tourGuides.map((tourGuide) => (
          <OurGuideTabCard
            key={tourGuide._id}
            tourGuide={tourGuide}
          ></OurGuideTabCard>
        ))}
      </div>
    </div>
  );
};

export default OurGuideTab;
