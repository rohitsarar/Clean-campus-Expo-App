import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http:// 192.168.7.75:5000/api/admin";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddingPeon, setIsAddingPeon] = useState(false); // Add loading state for adding peon
  const [isDeletingUser, setIsDeletingUser] = useState(false); // Add loading state for deleting user

  const getToken = async () => {
    try {
      const userData = await AsyncStorage.getItem("clean-campus");
      return JSON.parse(userData)?.token;
    } catch (e) {
      console.error("Error fetching token", e);
      return null;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await getToken();
        if (!token) {
          Alert.alert("Error", "User authentication failed");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/getuser`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data);
      } catch (error) {
        Alert.alert("Error", error.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    setIsDeletingUser(true); // Start loading
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "User authentication failed");
        return;
      }

      const response = await axios.delete(`${BASE_URL}/deleteuser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("Success", response.data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete user");
      console.error(error);
    } finally {
      setIsDeletingUser(false); // Stop loading
    }
  };

  const handleAddPeon = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsAddingPeon(true); // Start loading

    try {
      const token = await getToken(); // Get the token from AsyncStorage
      if (!token) {
        Alert.alert("Error", "User authentication failed");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/addpeon`,
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } } // Add token to headers
      );

      console.log('Add Peon Response:', response); // Log the entire response to inspect it
      console.log('Response Data:', response.data);

      // Check if response.data contains newUser or success message
      if (response.data?.newUser) {
        Alert.alert("Success", "Peon role added successfully");
        setUsers((prevUsers) => [...prevUsers, response.data.newUser]);

        // Clear the input fields automatically after success
        setName('');
        setEmail('');
        setPassword('');
      } else if (response.data?.message) {
        Alert.alert("Success", response.data.message); // Use a success message from the response
      } else {
        Alert.alert("Error", "Failed to add peon role: No new user data");
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to add peon role");
      console.error(error);
    } finally {
      setIsAddingPeon(false); // Stop loading
    }
  };

  return (
    <View className="flex-1 bg-mint p-4">
      <Text className="text-2xl font-bold text-center mb-3">Admin User Management</Text>

      <Text className="text-lg font-bold mt-6 mb-2 bg-gray-300 rounded-lg p-2">Add Peon:</Text>
      <TextInput
        className="border rounded-lg p-2 mb-2"
        placeholder="Peon Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="border rounded-lg p-2 mb-2"
        placeholder="Peon Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="border rounded-lg p-2 mb-4"
        placeholder="Peon Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleAddPeon} className="bg-blue-500 py-2 rounded-lg mb-4">
        {isAddingPeon ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-center text-white font-bold">Add</Text>
        )}
      </TouchableOpacity>

      <Text className="text-lg font-bold bg-gray-200 p-2 mb-2">All Users:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : users.length === 0 ? (
        <Text className="text-center text-gray-600">No users found.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="flex flex-row py-2 px-4 border-t">
              <Text className="flex-1 text-gray-700">{item.name || 'N/A'}</Text>
              <Text className="flex-1 text-gray-700">{item.email}</Text>
              <TouchableOpacity onPress={() => handleDeleteUser(item._id)} className="flex-1 items-center">
                {isDeletingUser ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="bg-red-500 text-white px-3 py-1 rounded-lg text-center">Delete</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AdminUserManagement;