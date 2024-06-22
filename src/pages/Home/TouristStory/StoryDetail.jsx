import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FacebookIcon, FacebookShareButton } from "react-share";
import Loader from "../../../components/Loader/Loader";
import useAuth from "./../../../hooks/useAuth";

const StoryDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const currentPage = window.location.href;
  const axiosSecure = useAxiosSecure();
  const { data: stories = {}, isLoading } = useQuery({
    queryKey: ["stories", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/usersStory/${id}`);
      //   console.log(data);
      return data;
    },
  });

  return (
    <div>
      <div className="flex justify-center my-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader></Loader>
          </div>
        ) : (
          <div className="card mt-8  glass mx-4">
            <figure>
              <img src={stories.image} className="object-cover" alt="car!" />
            </figure>
            <div className="card-body">
              <div className="flex gap-6 items-center">
                <img
                  src={stories.user_image}
                  className="w-20 rounded-full"
                  alt=""
                />
                <div>
                  <p>{stories.name}</p>
                  <p>{stories.email}</p>
                </div>
              </div>

              <p className="mt-6">{stories.about}</p>
              <div className="card-actions justify-end">
                {user && (
                  <FacebookShareButton url={currentPage}>
                    <FacebookIcon />
                  </FacebookShareButton>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
