import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/firebaseConfig"
import axiosInstance from "./axiosConfig";


 const signupPatient = async (
  email,
  password,
  fullname,
  contact,
  address,
  dob
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const token = await user.getIdToken();

    const userDataToSave = {
      fields: {
        uid: { stringValue: user.uid },
        password: { stringValue: password },
        name: { stringValue: fullname },
        email: { stringValue: email },
        contact: { stringValue: contact },
        created_At: { timestampValue: new Date().toISOString() },
        address: { stringValue: address },
        dob: { stringValue: dob },
        role: { stringValue: "Patient" },
      },
    };

    const response = await axiosInstance.post(`/users`, userDataToSave, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Patient data saved successfully:", response.data);

    return { uid: user.uid, token };
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.error("This email is already in use.");
    } else if (error.code === "auth/invalid-email") {
      console.error("Invalid email format.");
    } else if (error.code === "auth/weak-password") {
      console.error("Password is too weak.");
    } else {
      console.error("Error signing up:", error.message);
    }
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};

export default signupPatient;