import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import TourTypeIconBox from "./TourTypeIconBox";
import TourCat from "./TourCat";

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
    <div
      className="bg-teal-50 py-20 overflow-x-scroll"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <div className=" text-center">
        <h2 className="font-bold font-pacifico text-3xl text-teal-500">
          Tour Type
        </h2>
      </div>
      {/* <div className="flex justify-center gap-10">
        {tourTypes.map((tourType) => (
          <TourTypeIconBox
            key={tourType._id}
            tourType={tourType}
          ></TourTypeIconBox>
        ))}
      </div> */}
      <div className="container mx-auto max-w-[1300px] w-[100%] lg-w[88%] px-0 pb-0 ">
        <div className="carousel rounded-box ">
          {tourTypes.map((tourType) => (
            <TourCat key={tourType._id} tourType={tourType}></TourCat>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourTypeSection;
