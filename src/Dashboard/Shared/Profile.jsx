import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>profile</h2>
      <div>
        <img src={user?.photoURL} alt="" />
      </div>
      <h2>{user?.displayName}</h2>
      <h2>{user?.email}</h2>
    </div>
  );
};

export default Profile;
