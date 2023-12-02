import { useLazyQuery } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";
import { FIND_USER } from "../queries";
import { Button, TextInput } from "react-native-paper";
function SearchScreen() {
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
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Seach the User</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Content"
          placeholder="Add Your Content"
          //   value={content}
          //   onChangeText={setContent}
        />
        <Button style={styles.button} mode="contained" onPress={pressSearch}>
          Next
        </Button>
      </View>
    </View>
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
});

export default SearchScreen;
