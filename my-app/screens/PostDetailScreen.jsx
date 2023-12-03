import { COMMENT, GET_POST_DETAIL, LIKE } from "../queries";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

function PostDetailScreen({ route }) {
  const params = route.params;
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [content, setContent] = useState("");

  const { loading, error, data } = useQuery(GET_POST_DETAIL, {
    variables: {
      readOnePostId: params.id,
    },
    onCompleted: (result) => {
      console.log(result);
    },
    onError: (error) => {
      console.log(error);
    },
    fetchPolicy: "network-only",
  });

  const onClickLikeDown = () => {
    console.log("hello");
    setArrowDown(true);
    console.log(arrowUp);
  };
  const [comment] = useMutation(COMMENT, {
    onCompleted: (result) => {
      console.log(result);
    },
    refetchQueries: [
      {
        query: GET_POST_DETAIL,
      },
    ],
    onError: (error) => {
      console.log(error);
    },
  });
  const [id, setId] = useState("");
  const pressComment = async () => {
    setId(data?.readOnePost?.data?._id);
    await comment({
      variables: {
        id,
        content,
      },
    });
  };
  const [like] = useMutation(LIKE, {
    onCompleted: (result) => {
      console.log(result);
    },
    refetchQueries: [
      {
        query: GET_POST_DETAIL,
      },
    ],
    onError: (error) => {
      console.log(error);
    },
  });
  const onClickLikeUp = async () => {
    setId(data?.readOnePost?.data?._id);
    await like({
      variables: {
        id,
      },
    });
    console.log("hello");
    setArrowUp(true);
    console.log(arrowUp);
  };
  console.log(data?.readOnePost?.data?.likes, 85);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {data && (
        <>
          <Card style={styles.card}>
            <View style={styles.content}>
              <Text style={styles.cardTitle}>
                {data?.readOnePost?.data?.content}
              </Text>
              {/* <Text style={styles.cardContent}>{}</Text> */}
            </View>
            <Card.Cover
              style={styles.cardImage}
              source={{ uri: `${data?.readOnePost?.data?.imgUrl}` }}
            />
            <Card.Actions style={styles.cardActions}>
              <View style={styles.buttonsContainer}>
                <View style={styles.leftButtons}>
                  {arrowUp ? (
                    <Button
                      labelStyle={{ fontSize: 12 }}
                      style={styles.button}
                      onPress={onClickLikeUp}
                    >
                      <MaterialCommunityIcons
                        name="arrow-up-bold"
                        size={24}
                        color="black"
                      />
                    </Button>
                  ) : (
                    <Button
                      labelStyle={{ fontSize: 12 }}
                      style={styles.button}
                      onPress={onClickLikeUp}
                    >
                      {<AntDesign name="arrowup" size={18} color="black" />}
                    </Button>
                  )}
                  <Text>{data?.readOnePost?.data?.likes.length}</Text>
                  {arrowDown ? (
                    <Button
                      labelStyle={{ fontSize: 12 }}
                      style={styles.button}
                      onPress={onClickLikeDown}
                    >
                      <Entypo name="arrow-down" size={24} color="black" />
                    </Button>
                  ) : (
                    <Button
                      labelStyle={{ fontSize: 12 }}
                      style={styles.button}
                      onPress={onClickLikeDown}
                    >
                      {<AntDesign name="arrowdown" size={18} color="black" />}
                    </Button>
                  )}

                  <Button
                    labelStyle={{ fontSize: 12 }}
                    style={styles.commentButton}
                  >
                    <FontAwesome5 name="comment-alt" size={18} color="black" />
                    {"  "}
                    <Text style={styles.commentText}>Comments</Text>
                  </Button>
                </View>
                <View style={styles.rightButtons}>
                  <Button
                    labelStyle={{ fontSize: 12 }}
                    style={styles.asripButton}
                  >
                    <Ionicons
                      name="arrow-redo-outline"
                      size={16}
                      color="black"
                    />
                  </Button>
                </View>
              </View>
            </Card.Actions>
          </Card>
          {data?.readOnePost?.data?.comments.map((comment) => {
            return (
              <Card style={{ backgroundColor: "white" }}>
                <Card.Content>
                  <Text variant="titleLarge">{comment.content}</Text>
                </Card.Content>
              </Card>
            );
          })}
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.inputComment}
                mode="outlined"
                label="Comment Here"
                placeholder="Input Your Comment"
                onChangeText={setContent}
              />
              <Button
                style={styles.buttonComment}
                mode="contained"
                onPress={pressComment}
              >
                Post
              </Button>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  formContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 500,
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 14,
    marginBottom: 10,
  },
  cardImage: {
    height: 350,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  cardActions: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 15,
  },
  buttonComment: {
    width: 90,
    height: 40,
    backgroundColor: "red",
  },
  inputComment: {
    width: 250,
    marginBottom: 20,
    backgroundColor: "#F0F0F0",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  commentButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    marginRight: 8,
  },
  commentText: {
    marginLeft: 5,
    textAlignVertical: "center",
  },
  asripButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 20,
  },
});

export default PostDetailScreen;
