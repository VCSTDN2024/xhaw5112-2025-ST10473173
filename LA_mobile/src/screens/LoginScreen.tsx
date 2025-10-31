import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
const AsyncStorage = require('@react-native-async-storage/async-storage').default;

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  // Configure WebBrowser for better auth experience
  WebBrowser.maybeCompleteAuthSession();

  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleSignIn = () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      // Simulate API call
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setLoadingProvider('google');
      
      // For demo purposes, we'll simulate Google sign-in
      // In a real app, you would configure Google OAuth with proper client IDs
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Store user session
      await AsyncStorage.setItem('userToken', 'google_token_demo');
      await AsyncStorage.setItem('userProvider', 'google');
      
      Alert.alert('Success', 'Signed in with Google successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Main') }
      ]);
    } catch (error) {
      console.error('Google sign-in error:', error);
      Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setIsLoading(true);
      setLoadingProvider('facebook');
      
      // For demo purposes, we'll simulate Facebook sign-in
      // In a real app, you would configure Facebook OAuth with proper app IDs
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Store user session
      await AsyncStorage.setItem('userToken', 'facebook_token_demo');
      await AsyncStorage.setItem('userProvider', 'facebook');
      
      Alert.alert('Success', 'Signed in with Facebook successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Main') }
      ]);
    } catch (error) {
      console.error('Facebook sign-in error:', error);
      Alert.alert('Error', 'Failed to sign in with Facebook. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      setLoadingProvider('apple');
      
      // For demo purposes, we'll simulate Apple sign-in
      // In a real app, you would configure Apple Sign-In with proper identifiers
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Store user session
      await AsyncStorage.setItem('userToken', 'apple_token_demo');
      await AsyncStorage.setItem('userProvider', 'apple');
      
      Alert.alert('Success', 'Signed in with Apple successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Main') }
      ]);
    } catch (error) {
      console.error('Apple sign-in error:', error);
      Alert.alert('Error', 'Failed to sign in with Apple. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleForgotPassword = () => {
    if (!username.trim()) {
      Alert.alert('Username Required', 'Please enter your username to reset your password.');
      return;
    }
    
    // Simulate password reset process
    Alert.alert(
      'Password Reset Link Sent',
      `A password reset link has been sent to the email associated with "${username}". Please check your email.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Please sign in to your account</Text>

        <TextInput 
          style={[styles.input, errors.username ? styles.inputError : null]} 
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (errors.username) {
              setErrors({ ...errors, username: '' });
            }
          }}
        />
        {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
        
        <TextInput 
          style={[styles.input, errors.password ? styles.inputError : null]} 
          placeholder="Password" 
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) {
              setErrors({ ...errors, password: '' });
            }
          }}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSignIn}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity 
          style={[styles.socialButton, styles.googleButton, isLoading && styles.disabledButton]}
          onPress={handleGoogleSignIn}
          disabled={isLoading}
        >
          <View style={styles.socialButtonContent}>
            {loadingProvider === 'google' ? (
              <ActivityIndicator size="small" color="#333" />
            ) : (
              <Image source={require('../../assets/google.png')} style={styles.socialIcon} />
            )}
            <Text style={styles.socialText}>
              {loadingProvider === 'google' ? 'Signing in...' : 'Sign In With Google'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, styles.facebookButton, isLoading && styles.disabledButton]}
          onPress={handleFacebookSignIn}
          disabled={isLoading}
        >
          <View style={styles.socialButtonContent}>
            {loadingProvider === 'facebook' ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Image source={require('../../assets/facebook.png')} style={styles.socialIcon} />
            )}
            <Text style={[styles.socialText, styles.facebookText]}>
              {loadingProvider === 'facebook' ? 'Signing in...' : 'Sign In With Facebook'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, styles.appleButton, isLoading && styles.disabledButton]}
          onPress={handleAppleSignIn}
          disabled={isLoading}
        >
          <View style={styles.socialButtonContent}>
            {loadingProvider === 'apple' ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Image source={require('../../assets/apple.png')} style={styles.socialIcon} />
            )}
            <Text style={[styles.socialText, styles.facebookText]}>
              {loadingProvider === 'apple' ? 'Signing in...' : 'Sign In With Apple'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>Don't Have An Account? Sign Up</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffefef',
  },
  contentContainer: {
    flexGrow: 1,
    width: '100%',
    padding: 20,
    paddingTop: 70,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 15,
  },
  forgotPassword: {
    color: '#ff69b4',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 5,
  },
  signInButton: {
    backgroundColor: '#ff69b4',
    width: '100%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    marginTop: 5,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 15,
    color: '#888',
    fontSize: 12,
  },
  socialButton: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButton: {
    backgroundColor: '#fff',
  },
  facebookButton: {
    backgroundColor: '#1877f2',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  facebookText: {
    color: '#fff',
  },
  signUpLink: {
    marginTop: 20,
    marginBottom: 30,
    color: '#ff69b4',
    fontSize: 13,
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  inputError: {
    borderColor: '#ff0000',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginBottom: 5,
    marginTop: -5,
    alignSelf: 'flex-start',
    marginLeft: 2,
  },
});
