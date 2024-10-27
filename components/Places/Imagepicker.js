import * as ImagePicker from 'expo-image-picker';
import { View, Button, Alert } from 'react-native';


export default function Imagepicker() {
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
    }

    return (
        <View>
        <View></View>
        <Button title="Take Image" onPress={takeImageHandler} />
        </View>
    );
}
