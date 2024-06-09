import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./../../hooks/useAxiosCommon";
import { useEffect, useState } from "react";

const PackageSingleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();

  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    if (location.state && location.state.from) {
      setPreviousLocation(location.state.from);
    }
  }, [location]);

  const axiosCommon = useAxiosCommon();
  const { data: packages = {}, isLoading } = useQuery({
    queryKey: ["packages", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/packages/${id}`);
      //   console.log(data);
      return data;
    },
  });

  if (isLoading) return "Loading.....";

  const handleBackClick = () => {
    if (previousLocation) {
      navigate(previousLocation);
    } else {
      navigate(-1);
    }
  };

  return (
    <div>
      <h2>{packages.title}</h2>
      {/*  */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4">
          {/* Case: 1 image */}
          {packages.spot_image.length === 1 && (
            <div className="w-full">
              <img
                src={packages.spot_image[0]}
                alt="Image 1"
                className="w-full h-96 object-cover rounded-lg shadow-md "
              />
            </div>
          )}

          {/* Case: 2 images */}
          {packages.spot_image.length === 2 && (
            <div className="flex gap-1 w-full">
              <div className="w-1/2">
                <img
                  src={packages.spot_image[0]}
                  alt="Image 1"
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="w-1/2">
                <img
                  src={packages.spot_image[1]}
                  alt="Image 2"
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          )}

          {/* Case: 3 images */}
          {packages.spot_image.length === 3 && (
            <div className="flex gap-1 w-full">
              <div className="w-1/2">
                <img
                  src={packages.spot_image[0]}
                  alt="Image 1"
                  className="w-full h-full object-cover  rounded-lg shadow-md"
                />
              </div>
              <div className="w-1/2">
                <div className="flex flex-wrap gap-1">
                  <div className="w-full">
                    <img
                      src={packages.spot_image[1]}
                      alt="Image 2"
                      className="w-full h-96 object-cover  rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full">
                    <img
                      src={packages.spot_image[2]}
                      alt="Image 3"
                      className="w-full h-96  object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Case: 4 images */}
          {packages.spot_image.length === 4 && (
            <div className="w-full flex justify-between gap-1">
              <div className="flex flex-wrap gap-1 w-1/2">
                {packages.spot_image.slice(0, 2).map((imageUrl, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 w-1/2">
                {packages.spot_image.slice(2, 4).map((imageUrl, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 3}`}
                      className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Case: 5 images */}
          {packages.spot_image.length === 5 && (
            <div className="flex w-full h-full gap-1">
              <div className="w-1/2 flex flex-col gap-1">
                {packages.spot_image.slice(0, 2).map((imageUrl, index) => (
                  <div key={index} className="flex-1">
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      className="w-full h-96 rounded-lg shadow-md object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="w-1/2 flex flex-col gap-1">
                <div className="flex-1">
                  <img
                    src={packages.spot_image[2]}
                    alt="Image 3"
                    className="w-full h-96  rounded-lg shadow-md object-cover"
                  />
                </div>
                <div className="flex flex-1 gap-1">
                  {packages.spot_image.slice(3, 5).map((imageUrl, index) => (
                    <div key={index} className="flex-1">
                      <img
                        src={imageUrl}
                        alt={`Image ${index + 4}`}
                        className="w-full h-96 rounded-lg shadow-md object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/*  */}
      <button className="btn btn-secondary" onClick={handleBackClick}>
        back
      </button>
    </div>
  );
};

export default PackageSingleDetail;
