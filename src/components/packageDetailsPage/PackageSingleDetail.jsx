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
      <h2>package details{packages.title}</h2>
      <button className="btn btn-secondary" onClick={handleBackClick}>
        back
      </button>
    </div>
  );
};

export default PackageSingleDetail;
