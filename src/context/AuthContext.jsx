import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // Signup
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: name,
    });

    setUser({ ...userCredential.user, displayName: name });
  };

  // Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Auto Detect User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, loginWithGoogle, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
