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
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type PaymentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;
type PaymentRouteProp = RouteProp<RootStackParamList, 'Payment'>;

interface Props {
  navigation: PaymentScreenNavigationProp;
}

export default function PaymentScreen({ navigation }: Props): React.JSX.Element {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const route = useRoute<PaymentRouteProp>();
  
  const { items, subtotal, discount, total } = route.params || {
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
  };

  const handleExpiryChange = (text: string) => {
    // Remove any non-numeric characters
    const numbers = text.replace(/\D/g, '');
    
    // Limit to 4 digits
    if (numbers.length <= 4) {
      // Format as MM/YY
      let formatted = numbers;
      if (numbers.length >= 2) {
        formatted = numbers.slice(0, 2) + '/' + numbers.slice(2, 4);
      }
      setExpiry(formatted);
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumber.replace(/\s/g, '').length < 13 || cardNumber.replace(/\s/g, '').length > 19) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = 'Please use MM/YY format';
    }
    
    if (!cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (cvv.length < 3 || cvv.length > 4) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = () => {
    try {
      if (!validateForm()) {
        Alert.alert('Validation Error', 'Please correct the errors before proceeding');
        return;
      }
      
      // Simulate payment processing
      navigation.navigate('OrderSuccess');
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Payment Error', 'An error occurred while processing your payment. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <View style={styles.orderSummaryCard}>
        <Text style={styles.orderSummaryTitle}>Order Summary</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <Text style={styles.orderItemName}>{item.name}</Text>
            <Text style={styles.orderItemPrice}>R{item.price}</Text>
          </View>
        ))}
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalPrice}>R{subtotal}</Text>
        </View>
        {discount > 0 && (
          <View style={styles.shippingRow}>
            <Text style={styles.shippingLabel}>Discount</Text>
            <Text style={styles.shippingPrice}>-R{discount.toFixed(2)}</Text>
          </View>
        )}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>R{total.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.cardDetailsTitle}>Card details</Text>
      
      <View style={styles.paymentMethodContainer}>
        <TouchableOpacity 
          style={[styles.paymentMethod, paymentMethod === 'card' && styles.paymentMethodSelected]}
          onPress={() => setPaymentMethod('card')}
        >
          <View style={styles.radioButton}>
            {paymentMethod === 'card' && <View style={styles.radioSelected} />}
          </View>
          <Text style={styles.paymentMethodText}>Credit/Debit Card</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.paymentMethod, paymentMethod === 'paypal' && styles.paymentMethodSelected]}
          onPress={() => setPaymentMethod('paypal')}
        >
          <View style={styles.radioButton}>
            {paymentMethod === 'paypal' && <View style={styles.radioSelected} />}
          </View>
          <Text style={styles.paymentMethodText}>PayPal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardDetailsSection}>
        <Text style={styles.cardLabel}>Cardholder Name</Text>
        <TextInput 
          style={[styles.input, errors.cardholderName ? styles.inputError : null]} 
          placeholder="Full Name"
          value={cardholderName}
          onChangeText={setCardholderName}
        />
        {errors.cardholderName && <Text style={styles.errorText}>{errors.cardholderName}</Text>}
        
        <Text style={styles.cardLabel}>Card Number</Text>
        <TextInput 
          style={[styles.input, errors.cardNumber ? styles.inputError : null]} 
          placeholder="012 345 6789" 
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
        
        <View style={styles.cardDetailsRow}>
          <View style={styles.cardDetailItem}>
            <Text style={styles.cardLabel}>Expiry (MM/YY)</Text>
            <TextInput 
              style={[styles.input, styles.expiryInput, errors.expiry ? styles.inputError : null]} 
              placeholder="MM/YY"
              value={expiry}
              onChangeText={handleExpiryChange}
              keyboardType="numeric"
              maxLength={5}
            />
            {errors.expiry && <Text style={styles.errorText}>{errors.expiry}</Text>}
          </View>
          
          <View style={styles.cardDetailItem}>
            <Text style={styles.cardLabel}>CVV</Text>
            <TextInput 
              style={[styles.input, styles.cvvInput, errors.cvv ? styles.inputError : null]} 
              placeholder="123" 
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
            />
            {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
          </View>
        </View>
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity style={styles.checkbox}>
          <Text style={styles.checkmark}>✓</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>I agree to the Terms and Conditions</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Quotes')}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
    marginBottom: 20,
  },
  orderSummaryCard: {
    backgroundColor: '#ddd',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItemName: {
    fontSize: 16,
    color: '#333',
  },
  orderItemPrice: {
    fontSize: 16,
    color: '#333',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  subtotalLabel: {
    fontSize: 16,
    color: '#333',
  },
  subtotalPrice: {
    fontSize: 16,
    color: '#333',
  },
  shippingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  shippingLabel: {
    fontSize: 16,
    color: '#333',
  },
  shippingPrice: {
    fontSize: 16,
    color: '#ff0000',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
  },
  cardDetailsSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginLeft: 2,
  },
  paymentMethodContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentMethodSelected: {
    backgroundColor: '#f0f0f0',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff69b4',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ffcce5',
    marginBottom: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff0000',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  cardDetailItem: {
    flex: 1,
  },
  expiryInput: {
    flex: 1,
  },
  cvvInput: {
    flex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#ff69b4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  payButton: {
    flex: 1,
    backgroundColor: '#ff69b4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
