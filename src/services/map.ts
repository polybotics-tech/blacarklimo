import axios from "axios";
import {
  LocationType,
  PlaceSuggestionType,
  RawPlaceSuggestionType,
} from "@/src/libs/types";
import { RedisCache } from "@/src/utils/cache";
import constants from "@/src/libs/constants";

const MAPBOX_BASE_URL = "https://api.mapbox.com";

const MAP_URL = {
  suggestion: MAPBOX_BASE_URL + `/search/searchbox/v1/suggest`,
  retrieve: MAPBOX_BASE_URL + `/search/searchbox/v1/retrieve`,
  geocode: MAPBOX_BASE_URL + `/search/geocode/v6/reverse`,
};

const DEFAULT_PROXIMITY = {
  longitude: -122.419416,
  latitude: 37.774929,
};

async function fetchMapSuggestions(
  query: string,
  sessionToken?: string,
  proximity?: { longitude: number; latitude: number },
): Promise<PlaceSuggestionType[] | null> {
  const searchText = query.trim() || "Stanford University";

  try {
    const cachedSuggestions = await RedisCache.fetch(
      constants.cacheKeyTemp.map.suggestion(searchText),
    );

    if (!cachedSuggestions) {
      const { data } = await axios.get(MAP_URL.suggestion, {
        params: {
          q: searchText,
          session_token: sessionToken,
          access_token: process.env.MAPBOX_API_KEY,
          limit: 5,
          proximity: `${proximity?.longitude ?? DEFAULT_PROXIMITY.longitude},${proximity?.latitude ?? DEFAULT_PROXIMITY.latitude}`,
          country: "US",
          types: "place,address,street,poi,category",
        },
      });

      const suggestions: PlaceSuggestionType[] = data?.suggestions?.map(
        (sug: RawPlaceSuggestionType) => {
          return {
            name: sug.name,
            mapbox_id: sug.mapbox_id,
            full_address: sug?.full_address,
            maki: sug?.maki,
            distance: sug?.distance,
          };
        },
      );

      await RedisCache.save(constants.cacheKeyTemp.map.suggestion(searchText));

      return suggestions;
    } else {
      return cachedSuggestions as PlaceSuggestionType[];
    }
  } catch (error) {
    console.log("server err: ", error);
    return null;
  }
}

async function fetchPlaceInformation(
  mapboxId: string,
  sessionToken?: string,
): Promise<LocationType | null> {
  try {
    const { data } = await axios.get(MAP_URL.retrieve + `/${mapboxId}`, {
      params: {
        access_token: process.env.MAPBOX_API_KEY,
        session_token: sessionToken,
      },
    });

    const place = data?.features?.[0];
    if (!place) return null;

    const placeInfo: LocationType = {
      name: place.properties?.name,
      address: place.properties?.full_address,
      coordinates: {
        lat: place.geometry?.coordinates?.[1],
        lng: place.geometry?.coordinates?.[0],
      },
    };

    return placeInfo;
  } catch (error) {
    console.log("server err: ", error);
    return null;
  }
}

async function fetchCoordinateAddress(
  longitude: number,
  latitude: number,
): Promise<LocationType | null> {
  try {
    const { data } = await axios.get(MAP_URL.geocode, {
      params: {
        longitude,
        latitude,
        access_token: process.env.MAPBOX_API_KEY,
        limit: 1,
        types: "place,address,street",
      },
    });

    const place = data?.features?.[0];
    if (!place) return null;

    const placeInfo: LocationType = {
      name: place.properties?.name,
      address: place.properties?.full_address,
      coordinates: {
        lat: place.geometry?.coordinates?.[1],
        lng: place.geometry?.coordinates?.[0],
      },
    };

    return placeInfo;
  } catch (error) {
    console.log("server err: ", error);
    return null;
  }
}

export { fetchMapSuggestions, fetchPlaceInformation, fetchCoordinateAddress };
