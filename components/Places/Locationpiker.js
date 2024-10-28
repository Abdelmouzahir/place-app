import { StyleSheet, View, Alert, Text } from "react-native";
import OutlinedButton from "../../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import * as Location from 'expo-location';
import MapView from "react-native-maps"; // Import MapView directly here

export default function LocationPicker(){
    const [pickedLocation, setPickedLocation] = useState(null);
    const [locationPermission, requestPermission] = Location.useForegroundPermissions();

    async function verifyPermission(){
        if (locationPermission.status === Location.PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (locationPermission.status === Location.PermissionStatus.DENIED){
            Alert.alert(
                'Permission Denied',
                'You need to grant location permissions to use this app',
                [{ text: 'Okay' }]
            );
            return false;
        } 
        return true;
    }

    async function getLocationHandler(){
        const hasPermission = await verifyPermission();
        if (!hasPermission){
            return;
        }
        const location = await Location.getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
        console.log(location);
        console.log(pickedLocation);
    }

    // Conditionally render MapView or a placeholder text
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
            <View style={styles.mapContainer}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon='map' onPress={() => {}}>Pick on Map</OutlinedButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    mapPreview: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
});
