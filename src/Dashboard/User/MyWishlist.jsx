import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";

const MyWishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(AuthContext);
  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>Sl</th>
                <th>Image</th>
                <th>Title</th>
                <th>Tour_Type</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.spot_image}
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                      alt=""
                    />
                  </td>
                  <td>{item.title}</td>
                  <td className="capitalize">{item.tour_type}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="flex flex-row gap-4 items-center justify-center">
                      <Link to={`/packages/${item._id}`}>
                        {" "}
                        <div className=" h-10 w-10 flex items-center text-center justify-center rounded-full cursor-pointer  bg-yellow-600">
                          <FaEye className="text-xl text-white "></FaEye>
                        </div>{" "}
                      </Link>
                      <div
                        onClick={() => removeFromWishlist(item._id)}
                        className=" h-10 w-10 flex items-center text-center justify-center rounded-full cursor-pointer  bg-red-600"
                      >
                        <FaTrash className="text-xl text-white "></FaTrash>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No items in your wishlist</p>
      )}
    </div>
  );
};

export default MyWishlist;
