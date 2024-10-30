import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

export default function PlaceDetails({ route, navigation }) {
  const [fetchPlace, setFetchPlace] = useState();

  function showOnMap() {
    navigation.navigate("Map");
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlace() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    loadPlace();
  }, [selectedPlaceId]);

  if (!fetchPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place Data...🔃</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMap}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
