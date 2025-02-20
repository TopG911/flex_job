import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

// Create the Redux store using configureStore (Recommended for Redux Toolkit)
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Define RootState type (for use in selectors)
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type (for use with useDispatch)
export type AppDispatch = typeof store.dispatch;

export default store;
