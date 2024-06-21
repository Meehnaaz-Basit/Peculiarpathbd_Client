import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../../hooks/useAxiosCommon";
import PackageCard from "./PackageCard";
import { Link, useLocation } from "react-router-dom";
import Button from "../../../../../components/Shared/button/Button";
import Loader from "../../../../../components/Loader/Loader";

const OurPackages = () => {
  const location = useLocation();
  const axiosCommon = useAxiosCommon();
  const { data: packages = {}, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/packages");
      //   console.log(data);
      return data;
    },
  });
  // console.log(packages);

  if (isLoading)
    return (
      <div>
        <Loader></Loader>
      </div>
    );

  // Limit to 3 packages
  const limitedPackages = packages.slice(0, 3);
  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-6">
        {limitedPackages.map((item) => (
          // <PackageCard
          //   key={item._id}
          //   item={item}
          //   state={{ from: location }}
          // ></PackageCard>
          <Link
            key={item._id}
            to={{
              // pathname: `/packages/${item._id}`,
              state: { from: location },
              search: location.search,
            }}
          >
            <PackageCard item={item} />
          </Link>
        ))}
      </div>
      <div className="mt-14 mx-auto text-center">
        <Link to="/packages">
          <Button buttonText="All Packages"></Button>
        </Link>
      </div>
    </div>
  );
};

export default OurPackages;
