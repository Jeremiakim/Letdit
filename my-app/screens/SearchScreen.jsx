import { useLazyQuery, useMutation } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";
import { FIND_USER, FOLLOW, GET_USER_DETAIL } from "../queries";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";

function SearchScreen() {
  const [username, setUsername] = useState("");
  const [errorFollow, setErrorFollow] = useState(null);
  const [dispatcher, { loading, error, data }] = useLazyQuery(FIND_USER, {
    onCompleted: (result) => {
      console.log(result);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const pressSearch = async () => {
    await dispatcher({
      variables: {
        username,
      },
    });
  };
  const [follow] = useMutation(FOLLOW, {
    onCompleted: (result) => {
      console.log(result);
    },
    refetchQueries: [
      {
        query: GET_USER_DETAIL,
      },
    ],
    fetchPolicy: "network-only",
    onError: (error) => {
      console.log(error);
      setErrorFollow("You Cannot Follow this Acccount");
    },
  });
  const [id, setId] = useState("");
  const pressFollow = async () => {
    setId(data?.user?.data?._id);
    setErrorFollow(null);
    await follow({
      variables: {
        input: {
          followingId: id,
        },
      },
    });
  };

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
          <View style={styles.profileDetails}>
            <Text style={styles.username}>{data?.user?.data?.username}</Text>
            <Text style={styles.name}>{data?.user?.data?.name}</Text>
            <Button
              style={styles.buttonFolow}
              mode="contained"
              onPress={pressFollow}
            >
              Follow
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.errorText}>
            {error ? `${error.message}` : "Found The User"}
          </Text>
        </View>
      )}
      {errorFollow && (
        <View style={styles.container}>
          <Text style={styles.errorText}>{errorFollow}</Text>
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
  buttonFolow: {
    width: 130,
    height: 40,
    backgroundColor: "blue",
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
