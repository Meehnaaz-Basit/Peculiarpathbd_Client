import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../../hooks/useAxiosCommon";
import OurGuideTabCard from "./OurGuideTabCard";

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

  if (isLoading) return "loading ....";
  return (
    <div>
      <h2>our guides </h2>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
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
