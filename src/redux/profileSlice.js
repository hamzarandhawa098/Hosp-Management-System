import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export const fetchUserProfile = createAsyncThunk("profile/fetchUser", async () => {
  const auth = getAuth();
  const db = getFirestore();

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await axiosInstance.get("/users");
          const users = response.data.documents;

          const matchedUser = users.find((doc) => doc.fields.uid?.stringValue === user.uid);

          if (matchedUser) {
            resolve({
              name: matchedUser.fields.name?.stringValue || "",
              email: matchedUser.fields.email?.stringValue || "",
              password: matchedUser.fields.password?.stringValue || "",
              documentId: matchedUser.name.split("/")[6],
            });
          } else {
            reject("User not found");
          }
        } catch (error) {
          reject(error.message);
        }
      } else {
        reject("No authenticated user");
      }
    });
  });
});

export const updateUserProfile = createAsyncThunk(
  "profile/updateUser",
  async ({ documentId, name, email, password, profileImage }, { rejectWithValue }) => {
    const db = getFirestore();
    try {
      const userRef = doc(db, "users", documentId);
      await updateDoc(userRef, { name, email, password, profileImage });

      return { name, email, password, profileImage }; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    email: "",
    password: "",
    profileImage: "",
    documentId: null,
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    resetUpdateStatus: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.documentId = action.payload.documentId;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.profileImage = action.payload.profileImage;
        state.isUpdated = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfileImage, resetUpdateStatus } = profileSlice.actions;
export default profileSlice.reducer;
