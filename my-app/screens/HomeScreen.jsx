import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GET_POST } from "../queries";
import { useQuery } from "@apollo/client";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const { loading, error, data } = useQuery(GET_POST);

  const onClickLikeUp = () => {
    console.log("hello");
    setArrowUp(true);
    console.log(arrowUp);
  };
  const onClickLikeDown = () => {
    console.log("hello");
    setArrowDown(true);
    console.log(arrowUp);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <FontAwesome name="reddit" size={40} color="blue" />
      </View>
    );
  }

  if (!loading && error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!loading && data) {
    console.log(JSON.stringify(data.readAllPosts.data, null, 2));
    const onPressCard = (id) => {
      navigation.navigate("Detail", {
        id,
      });
    };

    return (
      <ScrollView style={styles.container}>
        {data.readAllPosts.data.map((post) => {
          return (
            <Card
              style={styles.card}
              onPress={() => {
                onPressCard(post._id);
              }}
            >
              <View style={styles.content}>
                <Text style={styles.cardTitle}>{post.content}</Text>
                {/* <Text style={styles.cardContent}>{}</Text> */}
              </View>
              <Card.Cover
                style={styles.cardImage}
                source={{ uri: `${post.imgUrl}` }}
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
                      onPress={() => {
                        onPressCard(post._id);
                      }}
                    >
                      <FontAwesome5
                        name="comment-alt"
                        size={18}
                        color="black"
                      />
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
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 15,
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

export default HomeScreen;
