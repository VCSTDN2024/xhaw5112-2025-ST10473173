import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import QuotesScreen from './src/screens/QuotesScreen';
import ContactScreen from './src/screens/ContactScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import OrderSuccessScreen from './src/screens/OrderSuccessScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Main: { screen?: string } | undefined;
  CourseDetail: { courseTitle: string };
  Payment: { items: Array<{ name: string; price: number }>; subtotal: number; discount: number; total: number };
  OrderSuccess: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Courses: undefined;
  Quotes: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#f5f5f5' },
        tabBarActiveTintColor: '#ff69b4',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('./assets/home.png')} 
              style={{ width: 24, height: 24, tintColor: focused ? '#ff69b4' : '#888' }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Courses" 
        component={CoursesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('./assets/courses.png')} 
              style={{ width: 24, height: 24, tintColor: focused ? '#ff69b4' : '#888' }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Quotes" 
        component={QuotesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('./assets/quotes.png')} 
              style={{ width: 24, height: 24, tintColor: focused ? '#ff69b4' : '#888' }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Contact" 
        component={ContactScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('./assets/contact.png')} 
              style={{ width: 24, height: 24, tintColor: focused ? '#ff69b4' : '#888' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
