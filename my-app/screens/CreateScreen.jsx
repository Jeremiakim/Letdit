import { useMutation } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { ADD_POST, GET_POST } from "../queries";
import { useState } from "react";

function CreateScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");

  const [dispatcher] = useMutation(ADD_POST, {
    // We will use onCompleted to get the returned data
    onCompleted: (res) => {
      console.log("res", res);

      // We will just navigate back to the previous page
      navigation.goBack();
    },
    // We will use refetchQueries to refetch the data from GET_COLORS
    // This will make the data in cache updated and refetched AUTOMATICALLY
    refetchQueries: [
      {
        query: GET_POST,
      },
    ],
  });

  const onClickAddPost = () => {
    console.log(content, imgUrl, tags, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    if (!content || !imgUrl || !tags) {
      // Menampilkan pesan kesalahan jika ada input yang kosong
      console.log("Harap isi semua bidang");
      return;
    }

    dispatcher({
      variables: {
        input: {
          content,
          imgUrl,
          tags,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Add Your Post</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Content"
          placeholder="Add Your Content"
          value={content}
          onChangeText={setContent}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Image Url"
          placeholder="Add Your Image Url"
          value={imgUrl}
          onChangeText={setImgUrl}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="tags"
          placeholder="Add Your Tags"
          value={tags}
          onChangeText={setTags}
        />
        <Button style={styles.button} mode="contained" onPress={onClickAddPost}>
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

export default CreateScreen;
