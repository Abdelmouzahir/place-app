import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";

export default function Button({ onPress, children }) {
  return (
    <Pressable
      //&& => if it's true
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: Colors.primary50,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
