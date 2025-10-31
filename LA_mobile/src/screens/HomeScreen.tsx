import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';

type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        
      </View>
      
      <Text style={styles.tagline}>Building Skills, Changing Lives.</Text>

      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => navigation.navigate('Courses')}
      >
        <Text style={styles.startButtonText}>START</Text>
      </TouchableOpacity>

 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffefef',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#333',
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#ff69b4',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginBottom: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    marginTop: 10,
  },
  iconText: {
    fontSize: 24,
  },
});
