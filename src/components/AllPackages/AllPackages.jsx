import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

import Card from "./Card";

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

  return (
    <div>
      {packages.length}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 my-12">
        {packages.map((item) => (
          <Card key={item._id} item={item}></Card>
        ))}
      </div>
    </div>
  );
};

export default AllPackages;
