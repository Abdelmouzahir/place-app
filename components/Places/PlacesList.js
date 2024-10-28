import { FlatList } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

export default function PlacesList({ places }) {
  if (!places || places === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No Places added yet! you Can Add some 📸.
        </Text>
      </View>
    );
  }

  function handleRenderitem({ item }) {
    return <PlaceItem place={item} />;
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={handleRenderitem}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
