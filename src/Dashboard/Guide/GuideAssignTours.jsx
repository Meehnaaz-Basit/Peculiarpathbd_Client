import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Loader from "../../components/Loader/Loader";
import AssignedTourTable from "./AssignedTourTable";

const GuideAssignTours = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const {
    data: assignTour = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignTour"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/bookings/tour-Guide/${user.email}`
      );
      console.log(data, "tour guide assigned task");
      return data;
    },
  });
  return (
    <div>
      <h2>this is guide assign tours table</h2>
      <div>
        <div>
          {isLoading ? (
            <div>
              <Loader></Loader>
            </div>
          ) : (
            <>
              <AssignedTourTable
                assignTour={assignTour}
                refetch={refetch}
              ></AssignedTourTable>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideAssignTours;
