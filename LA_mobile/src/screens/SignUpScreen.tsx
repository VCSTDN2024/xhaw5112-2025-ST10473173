import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

export default function SignUpScreen({ navigation }: Props): React.JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '' };
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[A-Z])/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    }
    
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.password;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      // Simulate registration
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Main') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Create account and choose favourite course</Text>

      <TextInput 
        style={[styles.input, errors.name ? styles.inputError : null]} 
        placeholder="Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (errors.name) {
            setErrors({ ...errors, name: '' });
          }
        }}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      
      <TextInput 
        style={[styles.input, errors.email ? styles.inputError : null]} 
        placeholder="Your Email" 
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) {
            setErrors({ ...errors, email: '' });
          }
        }}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      
      <TextInput 
        style={[styles.input, errors.password ? styles.inputError : null]} 
        placeholder="Your Password" 
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

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By clicking register, you agree to our Terms and Data Policy
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInLink}>Have an account? Sign in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffefef',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#ff69b4',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  signInLink: {
    color: '#ff69b4',
    fontSize: 14,
  },
  inputError: {
    borderColor: '#ff0000',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 2,
  },
});
