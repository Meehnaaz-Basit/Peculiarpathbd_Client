import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAuth from "../../hooks/useAuth";
import BookingTable from "./Booking/BookingTable";
import Loader from "../../components/Loader/Loader";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const {
    data: bookings = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/bookings/${user.email}`);
      // console.log(data);
      return data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <>
          {/* {bookings.map((booking) => (
            <BookingTable booking={booking} key={booking._id}></BookingTable>
          ))} */}
          <BookingTable bookings={bookings} refetch={refetch}>
            {" "}
          </BookingTable>
        </>
      )}
    </div>
  );
};

export default MyBookings;
