import { useLazyQuery } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";
import { FIND_USER } from "../queries";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";

function SearchScreen() {
  const [username, setUsername] = useState("");
  const [dispatcher, { loading, error, data }] = useLazyQuery(FIND_USER, {
    onCompleted: (result) => {
      console.log(result);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const pressSearch = async () => {
    await dispatcher({
      variables: {
        username,
      },
    });
  };

  // if (error || !data?.followDetail?.data) {
  //   return (

  //   );
  // }
  console.log(data?.user?.data);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Search the User</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Search"
            placeholder="Search User"
            value={username}
            onChangeText={setUsername}
          />
          <Button style={styles.button} mode="contained" onPress={pressSearch}>
            Next
          </Button>
        </View>
      </View>
      {data ? (
        <View style={styles.container}>
          <View style={styles.profileHeader}></View>
          <View style={styles.profileDetails}>
            <Text style={styles.username}>{data?.user?.data?.username}</Text>
            <Text style={styles.name}>{data?.user?.data?.name}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.errorText}>
            {error ? `${error.message}` : "Found The User"}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: 250,
    marginBottom: 20,
    backgroundColor: "#F0F0F0",
  },
  button: {
    width: 130,
    height: 40,
    backgroundColor: "red",
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

export default SearchScreen;
