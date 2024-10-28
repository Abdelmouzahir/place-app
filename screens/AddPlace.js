import Placeform from "../components/Places/PlaceForm";

export default function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }
  return <Placeform onCreatePlace={createPlaceHandler} />;
}
