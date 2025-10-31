import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Image,
  Alert,
  Keyboard,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';

type ContactScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Contact'>;

interface Props {
  navigation: ContactScreenNavigationProp;
}

export default function ContactScreen({ navigation }: Props): React.JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        Alert.alert('Validation Error', 'Please correct the errors before submitting');
        return;
      }
      
      // Simulate form submission
      Keyboard.dismiss();
      Alert.alert('Success', 'Thank you for your message! We will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', 'Failed to send your message. Please try again.');
    }
  };

  const handleLinkPress = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open this link');
      }
    } catch (error) {
      console.error('Failed to open link:', error);
      Alert.alert('Error', 'Failed to open link. Please try again.');
    }
  };

  const handlePhoneCall = async (phoneNumber: string) => {
    try {
      const url = `tel:${phoneNumber}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot make phone call');
      }
    } catch (error) {
      console.error('Failed to make phone call:', error);
      Alert.alert('Error', 'Failed to make phone call. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Contact</Text>

      <TextInput 
        style={[styles.input, errors.name ? styles.inputError : null]} 
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      
      <TextInput 
        style={[styles.input, errors.email ? styles.inputError : null]} 
        placeholder="Your Email" 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      
      <TextInput 
        style={[styles.input, styles.messageInput, errors.message ? styles.inputError : null]} 
        placeholder="Your Message" 
        multiline 
        numberOfLines={4}
        value={message}
        onChangeText={setMessage}
      />
      {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Where to find us!</Text>

      <View style={styles.socialMediaIcons}>
        <TouchableOpacity 
          style={styles.socialIcon}
          onPress={() => handleLinkPress('https://www.youtube.com/@EmpoweringTheNation')}
        >
          <Image source={require('../../assets/youtube.png')} style={styles.socialIconImage} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.socialIcon}
          onPress={() => handleLinkPress('https://www.tiktok.com/@empowering814?_t=ZS-90qrcfU06wa&_r=1')}
        >
          <Image source={require('../../assets/tiktok.png')} style={styles.socialIconImage} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.socialIcon}
          onPress={() => handleLinkPress('https://www.instagram.com/empoweringthenation/')}
        >
          <Image source={require('../../assets/instagram.png')} style={styles.socialIconImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={() => handleLinkPress('https://www.google.com/maps/search/Santon')}
        >
          <Image source={require('../../assets/Sandton.png')} style={styles.mapImage} />
          <View style={styles.mapOverlay}>
            <Text style={styles.mapText}>📍 Tap to open in Maps</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.locationsTitle}>Our Locations</Text>

      <TouchableOpacity 
        style={styles.locationCard}
        onPress={() => {
          Linking.openURL('https://www.google.com/maps/search/Sandton+City,+83+Rivonia+Rd,+Sandhurst,+Sandton,+2196');
        }}
      >
        <Text style={styles.locationTitle}>Main Office:</Text>
        <TouchableOpacity onPress={() => handlePhoneCall('0818539901')}>
          <Text style={styles.locationContact}>0818539901</Text>
        </TouchableOpacity>
        <Text style={styles.locationAddress}>Sandton City, 83 Rivonia Rd, Sandhurst, Sandton, 2196</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.locationCard}
        onPress={() => {
          Linking.openURL('https://www.google.com/maps/search/Rosebank+Mall,+50+Bath+Ave,+Rosebank,+Johannesburg,+2196');
        }}
      >
        <Text style={styles.locationTitle}>Training Center:</Text>
        <TouchableOpacity onPress={() => handlePhoneCall('0813272699')}>
          <Text style={styles.locationContact}>0813272699</Text>
        </TouchableOpacity>
        <Text style={styles.locationAddress}>Rosebank Mall, 50 Bath Ave, Rosebank, Johannesburg, 2196</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.locationCard}
        onPress={() => {
          Linking.openURL('https://www.google.com/maps/search/Midrand+Library,+New+Rd,+Midrand,+1685');
        }}
      >
        <Text style={styles.locationTitle}>Community Hub:</Text>
        <TouchableOpacity onPress={() => handlePhoneCall('0692299592')}>
          <Text style={styles.locationContact}>0692299592</Text>
        </TouchableOpacity>
        <Text style={styles.locationAddress}>Midrand Library, New Rd, Midrand, 1685</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#ff69b4',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 20,
  },
  socialMediaIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  socialIconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#ddd',
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  mapButton: {
    flex: 1,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    alignItems: 'center',
  },
  mapText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  locationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  locationCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff69b4',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationContact: {
    fontSize: 15,
    color: '#ff69b4',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  locationAddress: {
    fontSize: 14,
    color: '#ff69b4',
    textDecorationLine: 'underline',
  },
  inputError: {
    borderColor: '#ff0000',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    marginLeft: 20,
    marginTop: -10,
    fontSize: 12,
  },
});
