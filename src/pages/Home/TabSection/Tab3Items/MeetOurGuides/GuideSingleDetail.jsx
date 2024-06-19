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
      console.log(data);
      return data;
    },
  });

  if (isLoading) return "Loading.....";

  return (
    <div>
      {/* <h2>Details: {tourGuide.name}</h2> */}

      <div className="container max-w-3xl mx-auto my-4 p-6 bg-white shadow-lg rounded">
        <div className="flex flex-col justify-center items-center md:flex-row">
          <figure>
            <img
              className="w-48 h-48 rounded-full mx-auto md:mx-0 object-cover"
              src={tourGuide.guide_image || defaultImageUrl}
              alt={tourGuide.name}
              onError={(e) => {
                if (e.target.alt === tourGuide.name) {
                  e.target.src = defaultImageUrl;
                }
              }}
            />
          </figure>
          <div className="md:ml-6 mt-4 md:mt-0">
            <h1 className="text-2xl font-bold text-teal-500">
              {tourGuide.name}
            </h1>
            <p>
              <span className="font-semibold">Email:</span> {tourGuide.email}
            </p>

            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {tourGuide.contact && tourGuide.contact.length > 0
                ? tourGuide.contact[0].number
                : "No details yet"}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {tourGuide.contact && tourGuide.contact.length > 0
                ? tourGuide.contact[0].address
                : "No details yet"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold font-pacifico text-teal-500 underline">
            Education
          </h2>
          {tourGuide.education && tourGuide.education.length > 0 ? (
            <ul className="list-disc list-inside">
              {tourGuide.education.map((edu, index) => (
                <li key={index}>
                  {edu.degree} from {edu.institution} ({edu.yearOfCompletion})
                </li>
              ))}
            </ul>
          ) : (
            <p>No details yet</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold font-pacifico text-teal-500 underline">
            Skills
          </h2>
          {tourGuide.skills && tourGuide.skills.length > 0 ? (
            <ul className="list-disc list-inside">
              {tourGuide.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No details yet</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold font-pacifico text-teal-500 underline">
            Work Experience
          </h2>
          {tourGuide.workExperience && tourGuide.workExperience.length > 0 ? (
            tourGuide.workExperience.map((work, index) => (
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
            ))
          ) : (
            <p>No details yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideSingleDetail;
