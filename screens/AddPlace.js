import Placeform from "../components/Places/PlaceForm";

export default function AddPlace({ navigation }) {
  function createPlaceHandler(place) {}
  return <Placeform onCreatePlace={createPlaceHandler} />;
}
