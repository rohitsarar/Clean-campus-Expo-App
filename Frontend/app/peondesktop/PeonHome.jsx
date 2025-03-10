import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import io from "socket.io-client";
import Navbar from "../../components/Navbar";
import Posts from "../posts/Posts";
import { LinearGradient } from 'expo-linear-gradient';

import { EXPO_PUBLIC_SERVER_URL } from "@env";
export default function PeonHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("All");



  const theme = useColorScheme(); // Detect system theme (light/dark)

  // Define colors based on theme
  const gradientColors = theme === 'dark' ? ['white', 'white'] : ['black', 'white'];
  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const cardBackground = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? '#333' : '#ddd';
  const buttonBackground = theme === 'dark' ? '#007BFF' : '#28A745';


  const socket = io(`${EXPO_PUBLIC_SERVER_URL}`); // Adjust the URL as needed

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${EXPO_PUBLIC_SERVER_URL}/api/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Unable to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Listen for socket events
    socket.on("newPost", (newPost) => {
      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts, newPost];
        return updatedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date, newest first
      });
    });

    return () => {
      socket.off("newPost");
      socket.off("postLiked");
    };
  }, []);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, isLiked: true } : post
      )
    );
    socket.emit("likePost", { postId });
  };

  // Filter and sort posts
  const filteredPosts = posts
    .filter((post) => {
      if (selectedTab === "Pending") return !post.isLiked;
      if (selectedTab === "Completed") return post.isLiked;
      return true; // For "All" tab
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date, newest first

  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      <Navbar />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "All" && styles.activeTab]}
          onPress={() => setSelectedTab("All")}
        >
          <Text style={styles.tabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "Pending" && styles.activeTab]}
          onPress={() => setSelectedTab("Pending")}
        >
          <Text style={styles.tabText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "Completed" && styles.activeTab]}
          onPress={() => setSelectedTab("Completed")}
        >
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading posts...</Text>
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Posts post={item} onLike={handleLike} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No posts available</Text>
          }
        />
      )}
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E5E7EB",
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#4CAF50",
  },
  tabText: {
    color: "black",
  },
  loadingText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 16,
  },
});
