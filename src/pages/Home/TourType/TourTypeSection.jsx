import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import TourTypeIconBox from "./TourTypeIconBox";

const TourTypeSection = () => {
  const axiosCommon = useAxiosCommon();
  const { data: tourTypes = {}, isLoading } = useQuery({
    queryKey: ["tourType"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/tourType");
      console.log(data);
      return data;
    },
  });

  if (isLoading) return "Loading....";

  return (
    <div>
      <h2>this is tour type section</h2>
      <div className="flex justify-center gap-10">
        {tourTypes.map((tourType) => (
          <TourTypeIconBox
            key={tourType._id}
            tourType={tourType}
          ></TourTypeIconBox>
        ))}
      </div>
    </div>
  );
};

export default TourTypeSection;
