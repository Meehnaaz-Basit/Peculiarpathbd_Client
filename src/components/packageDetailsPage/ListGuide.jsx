import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Loader from "../Loader/Loader";
import ListGuideDesign from "./ListGuideDesign";

const ListGuide = () => {
  const axiosCommon = useAxiosCommon();
  const { data: tourGuides = {}, isLoading } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/tourGuides");
      //   console.log(data);
      return data;
    },
  });
  if (isLoading)
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 ">
      {tourGuides.map((tourGuide) => (
        <ListGuideDesign
          key={tourGuide._id}
          tourGuide={tourGuide}
        ></ListGuideDesign>
      ))}
    </div>
  );
};

export default ListGuide;
