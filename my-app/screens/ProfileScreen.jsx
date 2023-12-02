import React, { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USER_DETAIL } from "../queries/index";
import { LoginContext } from "../context/LoginContext";

const ProfileScreen = () => {
  const { userId } = useContext(LoginContext);
  const { loading, error, data } = useQuery(GET_USER_DETAIL);
  console.log(data?.followDetail?.data?.following.length);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    );
  }

  if (error || !data?.followDetail?.data) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {error ? `Error: ${error.message}` : "Data pengguna tidak ditemukan"}
        </Text>
      </View>
    );
  }

  const userData = data.followDetail.data;

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {/* Tambahkan gambar profil disini */}
        </View>
        <Text style={styles.username}>{userData.username}</Text>
        <Text style={styles.karma}>Karma: {userData.karma}</Text>
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text style={styles.email}>
          {userData?.followers?.length} followers
        </Text>
        <Text style={styles.email}>
          {userData?.following?.length} following
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF4500",
    marginBottom: 10,
    // Tambahan gaya lainnya untuk avatar
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  karma: {
    fontSize: 16,
    color: "gray",
  },
  profileDetails: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
});

export default ProfileScreen;
