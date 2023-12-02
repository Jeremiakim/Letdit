import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../queries/index"; // Ubah path sesuai dengan lokasi query Anda
import client from "../config/apollo";

function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  console.log(client.cache.config.dataIdFromObject, 9);

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: "", // Ganti dengan ID pengguna yang login
    },
    onCompleted: (data) => {
      setUserData(data?.user?.data); // Menyimpan data pengguna setelah query selesai
    },
  });

  useEffect(() => {
    // Ambil data pengguna setelah komponen dimount
    // Misalnya, Anda bisa mendapatkan ID pengguna dari SecureStore di sini
    // Kemudian gunakan ID ini untuk melakukan query dengan Apollo Client
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      {userData ? (
        <View>
          <Text>Nama: {userData.name}</Text>
          <Text>Username: {userData.username}</Text>
          <Text>Email: {userData.email}</Text>
          {/* Tampilkan informasi pengguna lainnya */}
        </View>
      ) : (
        <Text>Data pengguna tidak ditemukan</Text>
      )}
    </View>
  );
}

export default ProfileScreen;
