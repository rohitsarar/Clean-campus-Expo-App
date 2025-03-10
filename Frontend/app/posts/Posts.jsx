import { View, Text, Image, TouchableOpacity, ActivityIndicator, useColorScheme } from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { io } from "socket.io-client"; 
import { useAuthContext } from "../../context/AuthContext";
import { EXPO_PUBLIC_SERVER_URL } from "@env";
// Initialize socket connection globally
const socket = io(EXPO_PUBLIC_SERVER_URL);
  

export default function Posts({ post, onLike }) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const { user } = useAuthContext(); // Get user data
  const [loading, setLoading] = useState(true); // Track image loading
  const theme = useColorScheme(); // Detect system theme
  // console.log("post",post)

  // Define colors based on theme
  const backgroundColor = theme === "dark" ? "#1E1E1E" : "#FFFFFF";
  const cardBackground = theme === "dark" ? "#2A2A2A" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const captionBackground = theme === "dark" ? "#333333" : "#F3F3F3";
  const borderColor = theme === "dark" ? "#444" : "#DDD";
  const statusColor = isLiked ? "green" : "red";

  useEffect(() => {
    // Listen to the postLiked event
    const handlePostLiked = ({ updatedPost }) => {
      if (updatedPost._id === post._id) {
        setIsLiked(true);
      }
    };

    socket.on("postLiked", handlePostLiked);

    // Cleanup on unmount
    return () => {
      socket.off("postLiked", handlePostLiked);
    };
  }, [post._id,isLiked]);

  const handleThumbClick = () => {
    if (user?.role === "peon" && !isLiked) {
      setIsLiked(true);
      onLike(post._id);
      socket.emit("likePost", { postId: post._id });
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <View
      style={{
        marginBottom: 16,
        marginTop: 2,
        backgroundColor: cardBackground,
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: borderColor,
      }}
    >
      {/* Profile Section */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <Image
          source={require("../../assets/images/profile.jpeg")}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View style={{ marginLeft: 16, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: textColor }}>
            {post.name || "Unknown User"}
          </Text>
          <Text style={{ fontSize: 14, color: "gray", padding: 2, flexDirection: "row", alignItems: "center" }}>
  <AntDesign name="calendar" size={14} color="black" /> {post?.postDate || "N/A"} {"  "}
  <AntDesign name="clockcircle" size={14} color="black" /> {post?.postTime || "N/A"}
</Text>

        </View> 
      </View>

      {/* Post Image Section */}
      {post.photo ? (
        <View style={{ width: "99%", height: 300 }}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="gray"
              style={{ position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -20 }, { translateY: -20 }] }}
            />
          )}
          <Image
            source={{ uri: post.photo }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            onLoad={handleImageLoad}
            onError={(e) => console.error("Image failed to load", e.nativeEvent.error)}
          />
        </View>
      ) : (
        <Text style={{ textAlign: "center", padding: 16, color: "gray" }}>
          Image not available
        </Text>
      )}

      {/* Caption Section */}
      {post.caption && (
        <Text
          style={{
            margin: 8,
            padding: 8,
            color: textColor,
            backgroundColor: captionBackground,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: borderColor,
          }}
        >
          {post.caption}
        </Text>
      )}

      {/* Status Section */}
      <View style={{ margin: 8, padding: 3 }}>
        <Text style={{ fontSize: 19, fontWeight: "500", color: statusColor }}>
          {isLiked ? "Status: Completed" : "Status: Pending"}
        </Text>
      </View>

      {/* Like Button for Peons */}
      {user?.role === "peon" && !isLiked && (
        <TouchableOpacity
          style={{ margin: 8 }}
          onPress={handleThumbClick}
          accessibilityLabel="Mark as Completed button"
          accessibilityHint="Marks the task as completed"
        >
          <AntDesign name="like1" size={35} color="green" />
        </TouchableOpacity>
      )}
    </View>
  );
}
