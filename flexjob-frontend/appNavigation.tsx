import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View, Text } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy loading for screens
const HomeScreen = React.lazy(() => import('./Screens')); 
const ProfileScreen = React.lazy(() => import('./Screens'));
const JobDetailsScreen = React.lazy(() => import('./Screens'));
const LoginScreen = React.lazy(() => import('./Screens'));

// TypeScript support (optional)
type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  JobDetails: { jobId: string };
  Login: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// Create navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Custom hook for authentication (mock implementation)
const useAuth = () => {
  // Replace with actual authentication logic
  return false; // Example: user is not logged in
};

// Error boundary fallback UI
function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <View>
      <Text>Something went wrong:</Text>
      <Text>{error.message}</Text>
      <Button onPress={resetErrorBoundary} title="Try again" />
    </View>
  );
}

// Bottom Tab Navigator
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main App Navigator
function AppNavigator() {
  const isLoggedIn = useAuth(); // Check authentication status

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NavigationContainer children={
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'Home' : 'Login'}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeTabs}
                options={{ title: 'Welcome' }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'User Profile' }}
              />
              <Stack.Screen
                name="JobDetails"
                component={JobDetailsScreen}
                options={{ title: 'Job Details' }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Login' }}
            />
          )}
        </Stack.Navigator>
      } />
    </ErrorBoundary>
  );
}

export default AppNavigator;