import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface ProfileProps {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

const ProfileScreen: React.FC = () => {
  const user: ProfileProps = {
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Passionate about coding and mobile development. Love to build amazing apps!",
    avatarUrl: "https://via.placeholder.com/100", // Replace with actual image URL
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Profile Image */}
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        
        {/* Profile Details */}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});

export default ProfileScreen;


