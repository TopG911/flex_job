import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User State Interface
interface UserState {
  userInfo: {
    id: string;
    name: string;
    email: string;
  } | null;
}

// Initial State
const initialState: UserState = {
  userInfo: null,
};

// Create Redux Slice (Modern Approach)
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set User Info
    setUser: (state, action: PayloadAction<UserState['userInfo']>) => {
      state.userInfo = action.payload;
    },
    // Clear User Info (Logout)
    clearUser: (state) => {
      state.userInfo = null;
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
