import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "../config/firebase-config";

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Get ID token with automatic refresh
  const getIdToken = async () => {
    if (!auth.currentUser) {
      throw new Error("No authenticated user");
    }
    try {
      return await auth.currentUser.getIdToken(true);
    } catch (error) {
      console.error("Failed to get ID token:", error);
      throw error;
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    console.log("AuthProvider useEffect - Setting up listener");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser?.email);
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      console.log("Cleaning up auth listener");
      unsubscribe();
    };
  }, [auth]);

  // Sign up with email and password
  const signup = async (email, password, additionalInfo = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Create user item in DynamoDB users table
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create user record in DynamoDB");
      }

      return user;
    } catch (error) {
      console.error("Signup Error", error);
      throw error;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    console.log("Login attempt for:", email);
    try {
      const authCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return authCredential;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Google Sign-In
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create/update user document in Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          displayName: user.displayName,
          // profilePicture: user.photoURL,
          lastLogin: new Date(),
        },
        { merge: true }
      );

      return user;
    } catch (error) {
      console.error("Google Sign-In Error", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Password Reset
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // isAuthenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // isVerifying
  const isVerifying = () => {
    return !!user;
  };

  // Value to be passed to consumers
  const value = {
    user,
    loading,
    getIdToken,
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
