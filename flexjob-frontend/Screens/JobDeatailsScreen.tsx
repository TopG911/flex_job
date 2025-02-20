import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface JobDetailsProps {
  title: string;
  company: string;
  description: string;
  salary: string;
  location: string;
}

const JobDetailsScreen: React.FC = () => {
  const job: JobDetailsProps = {
    title: "Software Engineer",
    company: "Tech Corp",
    description:
      "We are looking for a skilled Software Engineer to join our growing team. You will be responsible for developing scalable applications.",
    salary: "$80,000 - $100,000 / year",
    location: "New York, NY",
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.salary}>{job.salary}</Text>
        <Text style={styles.location}>{job.location}</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  company: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  salary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
  },
});

export default JobDetailsScreen;
