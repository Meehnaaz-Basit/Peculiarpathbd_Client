import { useParams } from "react-router-dom";
import useAxiosCommon from "../../../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const GuideSingleDetail = () => {
  const { id } = useParams();

  const defaultImageUrl = "https://i.ibb.co/94MhXkN/6769264-60111.jpg";

  const axiosCommon = useAxiosCommon();
  const { data: tourGuide = {}, isLoading } = useQuery({
    queryKey: ["tourGuides", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/tourGuides/${id}`);
      //   console.log(data);
      return data;
    },
  });

  if (isLoading) return "Loading.....";

  return (
    <div>
      <h2>details {tourGuide.name}</h2>
      <div>
        <div className="container mx-auto my-4 p-4 bg-white shadow rounded">
          <div className="flex flex-col md:flex-row">
            <figure>
              <img
                className="w-48 h-48 rounded-full mx-auto md:mx-0 object-cover"
                src={tourGuide.profilePicture || defaultImageUrl}
                alt={tourGuide.name}
                onError={(e) => {
                  if (e.target.alt === tourGuide.name) {
                    e.target.src = defaultImageUrl;
                  }
                }}
              />
            </figure>
            <div className="md:ml-6 mt-4 md:mt-0">
              <h1 className="text-2xl font-bold">{tourGuide.name}</h1>
              <p>Email: {tourGuide.contactDetails.email}</p>
              <p>Phone: {tourGuide.contactDetails.phone}</p>
              <p>Address: {tourGuide.contactDetails.address}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Education</h2>
            <ul className="list-disc list-inside">
              {tourGuide.education.map((edu, index) => (
                <li key={index}>
                  {edu.degree} from {edu.institution} ({edu.yearOfCompletion})
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Skills</h2>
            <ul className="list-disc list-inside">
              {tourGuide.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            {tourGuide.workExperience.map((work, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{work.position}</h3>
                <p>{work.company}</p>
                <p>{work.duration}</p>
                <ul className="list-disc list-inside">
                  {work.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Reviews</h2>
            {tourGuide.reviews && tourGuide.reviews.length > 0 ? (
              tourGuide.reviews.map((review, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <h3 className="font-bold">{review.user}</h3>
                  <p>Rating: {review.rating}/5</p>
                  <p>{review.comment}</p>
                  <p className="text-gray-600 text-sm">{review.date}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideSingleDetail;
