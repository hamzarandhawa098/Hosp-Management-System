import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axiosInstance from "./axiosConfig";

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    console.log("User ID:", user.uid);

    const response = await axiosInstance.get(`/users`);
    console.log("User data retrieved successfully:", response.data);

    const userDocuments = response.data.documents || [];
    const userDocument = userDocuments.find(
      (doc) =>
        doc.fields.uid?.stringValue === user.uid ||
        doc.fields.email?.stringValue === email
    );

    if (!userDocument) {
      throw new Error("User document not found.");
    }

    const userData = {
      uid: userDocument.fields.uid.stringValue,
      name: userDocument.fields.name.stringValue,
      role: userDocument.fields.role.stringValue,
      email: userDocument.fields.email.stringValue,
      specialization: userDocument.fields.specialization?.stringValue || "",
    };

    return { uid: user.uid, userData };
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      console.error("No user found with this email.");
    } else if (error.code === "auth/wrong-password") {
      console.error("Incorrect password.");
    } else if (error.code === "auth/invalid-email") {
      console.error("Invalid email format.");
    } else {
      console.error("Error logging in:", error.message);
    }

    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};

export default loginUser;
