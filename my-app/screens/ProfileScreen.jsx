import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USER_DETAIL } from "../queries/index";
import { LoginContext } from "../context/LoginContext";
import { Button, Modal } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

const ProfileScreen = () => {
  const { setIsLoggIn } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const OnPressLogOut = () => {
    // Tampilkan modal konfirmasi saat logout ditekan
    setShowModal(true);
  };

  const handleLogoutConfirmed = async () => {
    // Hapus token atau lakukan tindakan logout di sini
    console.log("Logging out...");
    await SecureStore.deleteItemAsync("token");
    setIsLoggIn(false);
    setShowModal(false); // Tutup modal setelah logout berhasil
  };

  const handleCancelLogout = () => {
    // Batalkan logout, sembunyikan modal
    setShowModal(false);
  };
  const { loading, error, data } = useQuery(GET_USER_DETAIL);
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
  console.log(userData);
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
        <Button onPress={OnPressLogOut}>Log Out</Button>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.ModalLogout}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Apakah Anda yakin ingin logout?
            </Text>
            <View style={styles.modalButtons}>
              <Button onPress={handleLogoutConfirmed}>Ya</Button>
              <Button onPress={handleCancelLogout}>Batal</Button>
            </View>
          </View>
        </View>
      </Modal>
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
  ModalLogout: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginHorizontal: 30,
    padding: 25,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ProfileScreen;
