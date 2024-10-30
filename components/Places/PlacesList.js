import { FlatList } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function PlacesList({ places }) {
  const navigation = useNavigation();

  function selectPlace(id) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No Places added yet! you Can Add some 📸.
        </Text>
      </View>
    );
  }
  //console.log(places);

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlace} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
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
