import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

import PackageCard from "../../pages/Home/TabSection/Tab3Items/OurPackage/PackageCard";

const AllPackages = () => {
  const axiosCommon = useAxiosCommon();
  const { data: packages = {}, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/packages");
      console.log(data);
      return data;
    },
  });

  if (isLoading) return "loading ....";

  return (
    <div className="container mx-auto max-w-[1300px] w-[100%] lg-w[88%] px-0 pb-0">
      {packages.length}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 my-12">
        {packages.map((item) => (
          <PackageCard key={item._id} item={item}></PackageCard>
        ))}
      </div>
    </div>
  );
};

export default AllPackages;
