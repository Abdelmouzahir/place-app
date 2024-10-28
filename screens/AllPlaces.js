import { Text } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlace] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlace((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}
