import { StyleSheet, View, Alert, Image, Text } from "react-native";
import OutlinedButton from "../../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import * as Location from 'expo-location';
import getMapPreview from "../../util/location";


export default function LocationPicker(){
    const [pickedLocation, setPickedLocation] = useState(null);
    const [locationPermission , requestPermission] = Location.useForegroundPermissions();

    async function verifyPermission(){
        if (locationPermission.status === Location.PermissionStatus.UNDETERMINED ){
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
        console.log(pickedLocation)
    }

    let locationPreview = <Text>No location picked yet.</Text>
    function pickOnMapHandler(){

    if (pickedLocation){
        locationPreview = <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />

    }
    }

    return <View>
        <View style={styles.mapPreview}>
             {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
        </View>

    </View>

}


const styles = StyleSheet.create({
    mapPreview: {
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
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4

    }

})