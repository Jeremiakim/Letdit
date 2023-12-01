import { Text, View } from "react-native";
import { Button, Card } from "react-native-paper";

function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={{ color: "black" }}>Home</Text>
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          // left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

export default HomeScreen;
