import * as ImagePicker from 'expo-image-picker';
import { View, Button, Alert, Image, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../../UI/OutlinedButton';


export default function Imagepicker() {
    const [Pickedimage, setPickedImage] = useState();
    const [ cameraPermission , requestPermission ]  = ImagePicker.useCameraPermissions();

    async function verifyPermission() {
        if (cameraPermission.status === ImagePicker.PermissionStatus.UNDETERMINED ){
           const permissionResponse = await requestPermission();

           return permissionResponse.granted;
        }

        if (cameraPermission.status === ImagePicker.PermissionStatus.DENIED){
            Alert.alert(
                'Permission Denied',
                'You need to grant camera permissions to use this app',
                [{ text: 'Okay' }]
            );
            return false;
        } 
        return true;
    }


    async function takeImageHandler() {
       const hasPermission = await verifyPermission();
        if (!hasPermission){
              return;
        }

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        console.log(image);
        setPickedImage(image.assets[0].uri)
        console.log(image.assets[0].uri)
    }

    let imagePreview = <Text> No Image taken yet.</Text>;

    if (Pickedimage) {
        imagePreview = <Image source={{ uri: Pickedimage }} style={styles.image} />;
    }

    return (
        <View>
        <View style={styles.imagePreviewStyle}>
            {imagePreview}
        </View>
        <OutlinedButton icon='camera' onPress={takeImageHandler}> Take Image </OutlinedButton>
        </View>
    );
}

const styles = StyleSheet.create({
    imagePreviewStyle: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
   
    },
    image: {
        width: '100%',
        height: '100%'
    }
})