import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type OrderSuccessScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OrderSuccess'>;

interface Props {
  navigation: OrderSuccessScreenNavigationProp;
}

export default function OrderSuccessScreen({ navigation }: Props): React.JSX.Element {
  const handleReturnHome = () => {
    // Navigate to Main tabs and reset the stack to go back to Home
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main', params: { screen: 'Home' } }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.successIcon}>
        <Image 
          source={require('../../assets/ordersuccesful.png')} 
          style={styles.successImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.successTitle}>Order Successful</Text>

      <TouchableOpacity style={styles.returnButton} onPress={handleReturnHome}>
        <Text style={styles.returnButtonText}>Return to home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successIcon: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successImage: {
    width: 150,
    height: 150,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  returnButton: {
    backgroundColor: '#ff69b4',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
