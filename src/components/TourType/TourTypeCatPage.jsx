import { Link, useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import Button from "../Shared/button/Button";
import Card from "../AllPackages/Card";

const TourTypeCatPage = () => {
  const { tourType } = useParams();

  const axiosCommon = useAxiosCommon();
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["category", tourType],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/packages/tour-type/${tourType}`);
      console.log(data);
      return data;
    },
  });

  if (isLoading) return "loading....";

  return (
    <div className="mx-8">
      <h1>Packages for {tourType}</h1>
      {packages.length > 0 ? (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 ">
          {/* {packages.map((pkg) => (
            <>
              <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    className="hover:scale-125 transition-all overflow-hidden h-60 object-cover"
                    src={pkg.spot_image}
                    alt="Shoes"
                  />
                </figure>
                <p className="absolute bg-pink-600 text-white">{pkg.price}</p>
                <div className="card-body ">
                  <h2 className="card-title">{pkg.title}</h2>
                  <p>{pkg.tour_type}</p>
                  <div className="card-actions justify-end">
                    <Link to={`/packages/${pkg._id}`}>
                      {" "}
                      <Button buttonText="View Details"></Button>{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))} */}
          {packages.map((item) => (
            <Card key={item._id} item={item}></Card>
          ))}
        </div>
      ) : (
        <p>No packages found for this tour type.</p>
      )}
    </div>
  );
};

export default TourTypeCatPage;
