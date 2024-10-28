import { StyleSheet, View, Alert, Text } from "react-native";
import OutlinedButton from "../../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

export default function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationPermission, requestPermission] =
    Location.useForegroundPermissions();
  const [readablelocation, setReadableLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    if (pickedLocation) {
      onPickLocation({ ...pickedLocation, address: readablelocation });
    }
  }, [pickedLocation, readablelocation, onPickLocation]);

  async function verifyPermission() {
    if (!locationPermission) {
      return false;
    }
    if (locationPermission.status === Location.PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermission.status === Location.PermissionStatus.DENIED) {
      Alert.alert(
        "Permission Denied",
        "You need to grant location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    const locationData = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
    setPickedLocation(locationData);

    try {
      const addressData = await Location.reverseGeocodeAsync({
        latitude: locationData.lat,
        longitude: locationData.lng,
      });
      if (addressData.length > 0) {
        const { name, street, city, region, postalCode, country } =
          addressData[0];
        setReadableLocation(
          `${name || street}, ${city}, ${region}, ${postalCode}, ${country}`
        );
      }
    } catch (error) {
      console.log("Error fetching address: ", error);
    }
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <MapView
        style={styles.mapPreview}
        region={{
          latitude: pickedLocation.lat,
          longitude: pickedLocation.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
      />
    );
  }

  return (
    <View>
      <View style={styles.mapContainer}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
