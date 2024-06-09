import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGuide = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isGuide, isPending: isGuideLoading } = useQuery({
    queryKey: [user?.email, "isGuide"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/guide/${user.email}`);
      console.log(res.data);
      return res.data?.guide;
    },
  });
  return [isGuide, isGuideLoading];
};

export default useGuide;
