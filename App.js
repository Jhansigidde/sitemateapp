import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserById = async () => {
    if (!userId.trim()) {
      Alert.alert('Please enter a user ID');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userInfo}><Text style={styles.label}>Name:</Text> {item.name}</Text>
      <Text style={styles.userInfo}><Text style={styles.label}>Username:</Text> {item.username}</Text>
      <Text style={styles.userInfo}><Text style={styles.label}>Email:</Text> {item.email}</Text>
      <Text style={styles.userInfo}><Text style={styles.label}>Phone:</Text> {item.phone}</Text>
      <Text style={styles.userInfo}><Text style={styles.label}>Website:</Text> {item.website}</Text>
      <Text style={styles.userInfo}><Text style={styles.label}>Company:</Text> {item.company.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Search by ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter user ID"
        value={userId}
        onChangeText={text => setUserId(text)}
        keyboardType="numeric"
      />
      <Button title="Search" onPress={fetchUserById} />
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
      ) : (
        userData ? (
          <FlatList
            data={[userData]}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
          />
        ) : null
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  userContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333',
  },
  loading: {
    marginTop: 20,
  },
});
