import { Text } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

export default function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlace] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadedPlaces() {
      const places = await fetchPlaces();
      setLoadedPlace(places);
    }
    if (isFocused) {
      loadedPlaces();
      //setLoadedPlace((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}
