import { View, Text, FlatList, ActivityIndicator,Animated} from "react-native";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Posts from "../posts/Posts";
import { EXPO_PUBLIC_SERVER_URL } from "@env";

// const SERVER_URL = EXPO_PUBLIC_SERVER_URL;
export default function TaskList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(EXPO_PUBLIC_SERVER_URL);
  const socket = io(EXPO_PUBLIC_SERVER_URL);
// Adjust the URL as needed
  const fadeAnim = useState(new Animated.Value(0))[0];
  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${EXPO_PUBLIC_SERVER_URL}/api/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      // console.log(data)
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

    // Listen for 'newPost' event from the server
    socket.on("newPost", (newPost) => {
      setPosts((prevPosts) => [...prevPosts, newPost]);
    });

    // Listen for 'postLiked' event
    socket.on("postLiked", ({ postId }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, isLiked: true } : post
        )
      );
    });
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Adjust the duration of the fade-in
      useNativeDriver: true,
    }).start();

    return () => {
      socket.off("newPost"); // Clean up the event listener
      socket.off("postLiked"); // Clean up the event listener
    };
  }, []); // Empty dependency array ensures this runs only once

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, isLiked: true } : post
      )
    );

    // Emit the like action to the server
    socket.emit("likePost", { postId });
  };
  const renderItem = ({ item }) => {
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <Posts post={item} onLike={handleLike} />
      </Animated.View>
    );
  };


  return (
    <View className="bg-blue-100 p-1">
      {loading ? (
       <ActivityIndicator size="large"  color="black" style={{ marginTop: 16,height:'100%' }} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#6B7280', marginTop: 16 }}>
              No posts available
            </Text>
          }
        />
      )}
    </View>
  );
}
