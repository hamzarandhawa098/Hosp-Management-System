import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axiosInstance from "../api/axiosConfig";

// SignUp Doctors
export const signupDoctor = createAsyncThunk(
  "auth/signupDoctor",
  async (
    { email, password, fullname, contact, address, gender, specialization, cnic, experience },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
          cnic: { stringValue: cnic },
          experience: { integerValue: parseInt(experience, 10) },
          role: { stringValue: "Doctor" },
          specialization: { stringValue: specialization },
          gender: { stringValue: gender },
        },
      };
      await axiosInstance.post("/users", userDataToSave);

      return { uid: user.uid, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// SignUp Patients
export const signupPatient = createAsyncThunk(
  "auth/signupPatient",
  async (
    { email, password, fullname, contact, address, dob },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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

      await axiosInstance.post("/users", userDataToSave, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { uid: user.uid, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const response = await axiosInstance.get(`/users`);
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
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
