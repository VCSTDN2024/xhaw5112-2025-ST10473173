import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../../App';

type QuotesScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Quotes'>;
type QuotesStackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;

interface Props {
  navigation: QuotesScreenNavigationProp;
}

interface QuoteItem {
  name: string;
  price: number;
}

export default function QuotesScreen({ navigation }: Props): React.JSX.Element {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  
  const coursePrices: { [key: string]: number } = {
    'First Aid': 1500,
    'Sewing': 1500,
    'Landscaping': 1500,
    'Life Skills': 1500,
    'Child Minding': 750,
    'Cooking': 750,
    'Garden Maintenance': 750,
  };
  
  const courses = Object.keys(coursePrices);

  const toggleCourse = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course) 
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  // Calculate discount based on number of courses
  const getDiscountPercent = () => {
    const count = selectedCourses.length;
    if (count === 0) return 0;
    if (count === 1) return 0;
    if (count === 2) return 5;
    if (count === 3) return 10;
    return 15; // 4 or more courses
  };

  // Calculate quote items based on selected courses
  const getQuoteItems = () => {
    return selectedCourses.map(course => ({
      name: course,
      price: coursePrices[course],
    }));
  };

  // Calculate totals
  const calculateTotals = () => {
    const items = getQuoteItems();
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const discount = getDiscountPercent();
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;
    
    return { subtotal, discountAmount, total, discount };
  };

  const handleProceedToPayment = () => {
    const totals = calculateTotals();
    (navigation as any).navigate('Payment', {
      items: getQuoteItems(),
      subtotal: totals.subtotal,
      discount: totals.discountAmount,
      total: totals.total,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Quotes</Text>

      <Text style={styles.sectionTitle}>Check for Courses</Text>

      <View style={styles.checkboxGrid}>
        {courses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={styles.checkboxItem}
            onPress={() => toggleCourse(course)}
          >
            <View style={[
              styles.checkbox,
              selectedCourses.includes(course) && styles.checkboxSelected
            ]}>
              {selectedCourses.includes(course) && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.quoteSummaryCard}>
        <Text style={styles.quoteTitle}>Quote Summary</Text>
        {getQuoteItems().length === 0 ? (
          <Text style={styles.emptyMessage}>Select courses to see quote</Text>
        ) : (
          <>
            {getQuoteItems().map((item, index) => (
              <View key={index} style={styles.quoteItem}>
                <Text style={styles.quoteItemName}>{item.name}</Text>
                <Text style={styles.quoteItemPrice}>R{item.price}</Text>
              </View>
            ))}
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Subtotal</Text>
              <Text style={styles.subtotalAmount}>R{calculateTotals().subtotal}</Text>
            </View>
            <View style={styles.discountRow}>
              <Text style={styles.discountLabel}>Discount ({selectedCourses.length} {selectedCourses.length === 1 ? 'course' : 'courses'})</Text>
              <Text style={styles.discountPercent}>{calculateTotals().discount}%</Text>
            </View>
            {calculateTotals().discount > 0 && (
              <View style={styles.discountAmountRow}>
                <Text style={styles.discountAmountLabel}>Discount Amount</Text>
                <Text style={styles.discountAmountValue}>-R{calculateTotals().discountAmount.toFixed(2)}</Text>
              </View>
            )}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>R{calculateTotals().total.toFixed(2)}</Text>
            </View>
          </>
        )}
      </View>

      {selectedCourses.length > 0 && (
        <TouchableOpacity 
          style={styles.proceedButton}
          onPress={handleProceedToPayment}
        >
          <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      )}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#ff69b4',
    borderColor: '#ff69b4',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  quoteSummaryCard: {
    backgroundColor: '#ddd',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  quoteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quoteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quoteItemName: {
    fontSize: 16,
    color: '#333',
  },
  quoteItemPrice: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  subtotalLabel: {
    fontSize: 16,
    color: '#333',
  },
  subtotalAmount: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  discountLabel: {
    fontSize: 16,
    color: '#333',
  },
  discountPercent: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  discountAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 8,
  },
  discountAmountLabel: {
    fontSize: 14,
    color: '#666',
  },
  discountAmountValue: {
    fontSize: 14,
    color: '#ff0000',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  proceedButton: {
    backgroundColor: '#ff69b4',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
