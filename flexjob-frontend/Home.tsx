import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust according to your store
import api from '../api/api';

// Define types for the user
interface User {
  name: string;
  email: string;
}

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const loading = useSelector((state: RootState) => state.user.loading); // Assuming you track loading state in Redux

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user');
        dispatch({ type: 'SET_USER', payload: response.data });
      } catch (error) {
        console.error('Failed to fetch user data', error);
        // You can also dispatch an error action to handle errors globally
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>{user ? `Welcome, ${user.name}` : 'No user data available'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
