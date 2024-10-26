import { View, Image, Text, Pressable, StyleSheet } from "react-native";


export default function PlaceItem({place, onSelect}){
    return (
        <Pressable onPress={onSelect}>
            <Image source={{uri: place.imageUri}} />
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    }
})