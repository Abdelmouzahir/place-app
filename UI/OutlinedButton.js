import {Ionicons} from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from '../constants/colors';


export default function OutlinedButton({onPress, icon, children}) {

    return <Pressable style={({pressed}) => [styles.button,  pressed && styles.pressed ]} onPress={onPress}>
    <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
    <Text style={styles.text}>{children}</Text>
    </Pressable>


}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: Colors.primary500,
        margin: 4
    },
    text: {
        color: Colors.primary500,
        fontSize: 16
    },  
    icon: {
        marginRight: 6
    },
    pressed :{
        opacity: 0.7
    }
    
})