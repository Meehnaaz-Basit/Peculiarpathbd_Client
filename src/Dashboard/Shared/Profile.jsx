import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import useGuide from "../../hooks/useGuide";
import UserProfileForm from "./UserProfileForm";

const Profile = () => {
  const { user } = useAuth();

  const [isAdmin] = useAdmin();
  const [isGuide] = useGuide();

  return (
    <div>
      <div>
        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
          <img
            src={user?.photoURL}
            alt=""
            className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square object-cover"
          />
          <div className="space-y-4 text-center divide-y dark:divide-gray-300">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {user?.displayName}
              </h2>

              <p className="px-5 text-xs sm:text-base dark:text-gray-600">
                {user?.email}
              </p>
              <p className="px-5 pt-3 underline text-xs sm:text-base dark:text-gray-600">
                {/* if isAdmin write Admin */}
                {/* if isGuide write Guide */}
                {/* if nothing write user */}
                {isAdmin ? "Admin" : isGuide ? "Guide" : "User"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* user form */}

      {!isAdmin && !isGuide && <UserProfileForm user={user}></UserProfileForm>}

      {/* guide form */}
    </div>
  );
};

export default Profile;
