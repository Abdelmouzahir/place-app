import { useCallback, useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import Imagepicker from "./Imagepicker";
import LocationPicker from "./Locationpiker";
import Button from "../../UI/Button";
import { Place } from "../../models/place";

export default function Placeform({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();

  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);

    // console.log(enteredTitle);
    // console.log(pickedLocation);
    // console.log(selectedImage);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <Imagepicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 1,
    backgroundColor: Colors.primary100,
    fontSize: 16,
  },
});
