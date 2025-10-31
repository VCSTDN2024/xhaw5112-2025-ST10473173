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
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';

type CoursesScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Courses'>;

interface Props {
  navigation: CoursesScreenNavigationProp;
}

interface Course {
  title: string;
  duration?: string;
  fee?: string;
  image: any;
}

export default function CoursesScreen({ navigation }: Props): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const allCourses: Course[] = [
    { title: 'First Aid', duration: '6 months', fee: 'R1500', image: require('../../assets/firstaid.jpeg') },
    { title: 'Sewing', duration: '6 months', fee: 'R1500', image: require('../../assets/sewing.jpg') },
    { title: 'Landscaping', duration: '6 months', fee: 'R1500', image: require('../../assets/landscaping.jpg') },
    { title: 'Life Skills', duration: '6 months', fee: 'R1500', image: require('../../assets/lifeskills.jpg') },
    { title: 'Child Minding', duration: '6 weeks', fee: 'R750', image: require('../../assets/childminding.jpg') },
    { title: 'Cooking', duration: '6 weeks', fee: 'R750', image: require('../../assets/cooking.jpg') },
    { title: 'Garden Maintenance', duration: '6 weeks', fee: 'R750', image: require('../../assets/gardenmaintence.jpg') },
  ];

  // Filter courses based on search query
  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewCourse = (courseTitle: string) => {
    try {
      navigation.navigate('CourseDetail', { courseTitle });
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Failed to open course details. Please try again.');
    }
  };

  const handleGetQuote = () => {
    try {
      navigation.navigate('Quotes');
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Failed to navigate to quotes. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Courses</Text>

      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchBar} 
          placeholder="Search" 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Course Grid */}
      <View style={styles.grid}>
        {filteredCourses.map((course, index) => (
          <View key={index} style={styles.courseCard}>
            <Image 
              source={course.image} 
              style={styles.courseImage}
              resizeMode="cover"
              onError={() => console.error(`Failed to load image for ${course.title}`)}
            />
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{course.duration}</Text>
              </View>
            </View>
            <Text style={styles.feeText}>Fee: {course.fee}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => handleViewCourse(course.title)}
              >
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quoteButton}
                onPress={handleGetQuote}
              >
                <Text style={styles.quoteButtonText}>Get Quote</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    marginTop: 25,
    marginBottom: 15,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    width: '100%',
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  courseCard: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: '2.5%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: '100%',
    height: 120,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    paddingBottom: 5,
  },
  courseTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  durationBadge: {
    backgroundColor: '#ff69b4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 5,
  },
  durationText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  feeText: {
    color: '#666',
    fontSize: 14,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 5,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#ff69b4',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  quoteButton: {
    flex: 1,
    backgroundColor: '#ff69b4',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  quoteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
