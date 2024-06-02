import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const AllPackages = () => {
  const axiosCommon = useAxiosCommon();
  const { data: packages = {}, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/packages");
      //   console.log(data);
      return data;
    },
  });

  if (isLoading) return "loading ....";

  return <div>{packages.length}</div>;
};

export default AllPackages;
