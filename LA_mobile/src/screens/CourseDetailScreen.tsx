import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type CourseDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CourseDetail'>;
type CourseDetailRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;

interface Props {
  navigation: CourseDetailScreenNavigationProp;
}

interface Course {
  title: string;
  duration: string;
  fee: string;
  image: any;
  purpose: string;
  learnings: string[];
}

const courseData: { [key: string]: Course } = {
  'First Aid': {
    title: 'First Aid',
    duration: '6 months',
    fee: 'R1500',
    image: require('../../assets/firstaid.jpeg'),
    purpose: 'To provide first aid awareness and basic life support skills that can save lives in emergency situations.',
    learnings: [
      'Wounds and bleeding management',
      'Burns and fractures treatment',
      'Emergency scene management',
      'Cardio-Pulmonary Resuscitation (CPR)',
      'Respiratory distress e.g. Choking, blocked airway',
    ],
  },
  'Sewing': {
    title: 'Sewing',
    duration: '6 months',
    fee: 'R1500',
    image: require('../../assets/sewing.jpg'),
    purpose: 'To provide alterations and new garment tailoring services that enhance your professional capabilities.',
    learnings: [
      'Types of stitches and their applications',
      'Threading and operating a sewing machine',
      'Seam finishes, hems, and basic repairs',
      'Measuring, darts, and simple patterns',
      'Hand sewing and creating new garments',
    ],
  },
  'Landscaping': {
    title: 'Landscaping',
    duration: '6 months',
    fee: 'R1500',
    image: require('../../assets/landscaping.jpg'),
    purpose: 'To provide comprehensive landscaping services for new and established gardens that enhance outdoor living spaces.',
    learnings: [
      'Indigenous and exotic plants and trees',
      'Garden tools and their proper uses',
      'Basic design: garden shapes, lawn care, and borders',
      'Practical maintenance: pruning, planting, and weeding',
      'Refuse removal and garden safety protocols',
    ],
  },
  'Life Skills': {
    title: 'Life Skills',
    duration: '6 months',
    fee: 'R1500',
    image: require('../../assets/lifeskills.jpg'),
    purpose: 'To provide essential life skills and personal development training for personal and professional growth.',
    learnings: [
      'Communication and interpersonal skills',
      'Time management and organization',
      'Problem-solving and decision making',
      'Financial literacy and budgeting',
      'Goal setting and personal development',
    ],
  },
  'Child Minding': {
    title: 'Child Minding',
    duration: '6 weeks',
    fee: 'R750',
    image: require('../../assets/childminding.jpg'),
    purpose: 'To provide comprehensive child and baby care skills that ensure the safety and well-being of children in your care.',
    learnings: [
      'Birth to six-months needs and care',
      'Seven to twelve-months developmental care',
      'Toddler care and development',
      'Nutrition, hygiene, and safety protocols',
    ],
  },
  'Cooking': {
    title: 'Cooking',
    duration: '6 weeks',
    fee: 'R750',
    image: require('../../assets/cooking.jpg'),
    purpose: 'To provide essential cooking and kitchen management skills for professional or personal use.',
    learnings: [
      'Kitchen safety and hygiene',
      'Basic cooking techniques and methods',
      'Meal planning and preparation',
      'Food storage and preservation',
      'Recipe reading and following instructions',
    ],
  },
  'Garden Maintenance': {
    title: 'Garden Maintenance',
    duration: '6 weeks',
    fee: 'R750',
    image: require('../../assets/gardenmaintence.jpg'),
    purpose: 'To provide comprehensive knowledge of watering, weeding, pruning, and planting techniques for domestic gardens.',
    learnings: [
      'Watering requirements for indigenous and exotic plants',
      'Weed control and mulching techniques',
      'Pruning techniques and seasonal care',
      'Planting techniques for different plant types',
    ],
  },
};

export default function CourseDetailScreen({ navigation }: Props): React.JSX.Element {
  const route = useRoute<CourseDetailRouteProp>();
  const { courseTitle } = route.params || { courseTitle: '' };
  
  const course = courseData[courseTitle] || courseData['First Aid'];

  const handleGetQuote = () => {
    navigation.navigate('Main', { screen: 'Quotes' });
  };

  const handleBackToCourses = () => {
    navigation.navigate('Main', { screen: 'Courses' });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section with Image */}
      <View style={styles.headerSection}>
        <Image 
          source={course.image} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseDetail}>Fee: {course.fee}</Text>
          <Text style={styles.courseDetail}>Duration: {course.duration}</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Purpose */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purpose</Text>
          <Text style={styles.sectionText}>{course.purpose}</Text>
        </View>

        {/* What You'll Learn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What You'll Learn</Text>
          {course.learnings.map((learning, index) => (
            <View key={index} style={styles.learningItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.learningText}>{learning}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToCourses}
          >
            <Text style={styles.backButtonText}>Back to courses</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quoteButton}
            onPress={handleGetQuote}
          >
            <Text style={styles.quoteButtonText}>Get Quote</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe0f0',
  },
  headerSection: {
    flexDirection: 'row',
    backgroundColor: '#ffe0f0',
    padding: 20,
    paddingTop: 40,
  },
  headerImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginRight: 20,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  courseDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  contentSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '100%',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff69b4',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  learningItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 20,
    color: '#333',
    marginRight: 10,
  },
  learningText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#ff69b4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quoteButton: {
    flex: 1,
    backgroundColor: '#ff69b4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  quoteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
