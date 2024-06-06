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
import axios from "axios";

// import axios from "axios";
// import app from "../firebase/firebase.config";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
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
    // await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
    //   withCredentials: true,
    // });
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // Get token from server
  const getToken = async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email },
      { withCredentials: true }
    );
    return data;
  };

  //onAuthStateChange
  useEffect(() => {
    // Retrieve wishlist data from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //   if (currentUser) {
      //     getToken(currentUser.email);
      //   }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   // Retrieve wishlist data from localStorage (fallback)
  //   const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  //   setWishlist(storedWishlist);

  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     setUser(currentUser);
  //     if (currentUser) {
  //       // Fetch wishlist data from database using user ID
  //       const userWishlist = await fetchWishlistFromDatabase(currentUser.uid);
  //       setWishlist(userWishlist);
  //     }
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const addToWishlist = (item) => {
    const updatedWishlist = [...wishlist, item];
    setWishlist(updatedWishlist);
    // Save updated wishlist data to localStorage
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const removeFromWishlist = (itemId) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== itemId);
    setWishlist(updatedWishlist);
    // Save updated wishlist data to localStorage
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // const addToWishlist = async (item) => {
  //   const updatedWishlist = [...wishlist, item];
  //   setWishlist(updatedWishlist);
  //   // Update wishlist in database for current user
  //   await updateWishlistInDatabase(currentUser.uid, updatedWishlist);
  // };

  // const removeFromWishlist = async (itemId) => {
  //   const updatedWishlist = wishlist.filter((item) => item._id !== itemId);
  //   setWishlist(updatedWishlist);
  //   // Update wishlist in database for current user
  //   await updateWishlistInDatabase(currentUser.uid, updatedWishlist);
  // };

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
  // Array of children.
  children: PropTypes.array,
};

export default AuthProvider;
