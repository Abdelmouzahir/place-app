import Placeform from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }
  return <Placeform onCreatePlace={createPlaceHandler} />;
}
