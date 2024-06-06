// import PropTypes from "prop-types";
// import { createContext, useEffect, useState } from "react";
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import app from "../firebase/firebase.config";
// import useAxiosCommon from "../hooks/useAxiosCommon";

// export const AuthContext = createContext(null);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const axiosCommon = useAxiosCommon();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [wishlist, setWishlist] = useState([]);

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const signInWithGoogle = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   const resetPassword = (email) => {
//     setLoading(true);
//     return sendPasswordResetEmail(auth, email);
//   };

//   const logOut = async () => {
//     setLoading(true);

//     return signOut(auth);
//   };

//   const updateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     });
//   };

//   //onAuthStateChange
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         // get token and store client
//         const userInfo = { email: currentUser.email };
//         axiosCommon.post("/jwt", userInfo).then((res) => {
//           if (res.data.token) {
//             localStorage.setItem("access-token", res.data.token);
//           }
//         });
//       } else {
//         // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
//         localStorage.removeItem("access-token");
//       }
//       setLoading(false);
//     });
//     return () => {
//       return unsubscribe();
//     };
//   }, [axiosCommon]);

//   const addToWishlist = (item) => {
//     const updatedWishlist = [...wishlist, item];
//     setWishlist(updatedWishlist);
//     // Save updated wishlist data to localStorage
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//   };

//   const removeFromWishlist = (itemId) => {
//     const updatedWishlist = wishlist.filter((item) => item._id !== itemId);
//     setWishlist(updatedWishlist);
//     // Save updated wishlist data to localStorage
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//   };

//   const clearWishlist = () => {
//     setWishlist([]);
//     localStorage.removeItem("wishlist");
//   };

//   const authInfo = {
//     user,
//     loading,
//     setLoading,
//     createUser,
//     signIn,
//     signInWithGoogle,
//     resetPassword,
//     logOut,
//     updateUserProfile,
//     wishlist,
//     addToWishlist,
//     removeFromWishlist,
//     clearWishlist,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default AuthProvider;

import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosCommon from "../hooks/useAxiosCommon";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosCommon = useAxiosCommon();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosCommon.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosCommon]);

  const addToWishlist = (item) => {
    const updatedWishlist = [...wishlist, item];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const removeFromWishlist = (itemId) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== itemId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
