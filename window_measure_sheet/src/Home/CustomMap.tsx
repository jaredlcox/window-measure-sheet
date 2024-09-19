import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useProjectContext } from "./ProjectContext";

/// <reference types="@types/googlemaps" />

declare global {
  interface Window {
    google: any;
  }
}

const CustomMap = forwardRef((props, ref) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<HTMLInputElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const location = useLocation();
  const { address, setAddress } = useProjectContext();

  useImperativeHandle(ref, () => ({
    handleSearch,
  }));

  useEffect(() => {
    if (mapRef.current === null) {
      const map = new window.google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 41.819, lng: -83.654 }, // Center near the polygons
          zoom: 15,
          mapTypeId: "satellite",
          tilt: 0,
          gestureHandling: "greedy",
          disableDefaultUI:
            location.pathname === "/projects/new" ? true : false,
          styles: [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
          ],
        }
      );

      mapRef.current = map;
    }

    if (autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        {
          types: ["geocode"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const location = place.geometry.location;
          const latLng = { lat: location.lat(), lng: location.lng() };
          setAddress(place.formatted_address);

          // Log the latitude and longitude
          console.log("Latitude: ", latLng.lat, "Longitude: ", latLng.lng);

          if (mapRef.current) {
            mapRef.current.setCenter(latLng);

            if (markerRef.current) {
              markerRef.current.setPosition(latLng);
            } else {
              markerRef.current = new window.google.maps.Marker({
                position: latLng,
                map: mapRef.current,
              });
            }
          }
        }
      });
    }
  }, [location.pathname, setAddress, address]);

  const handleSearch = async () => {
    if (autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
        types: ["geocode"],
      });
  
      // Listen to the place_changed event
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
  
        if (place.geometry) {
          const location = place.geometry.location;
          const latLng = { lat: location.lat(), lng: location.lng() };
          setAddress(place.formatted_address);
  
          // Log the latitude and longitude
          console.log("Latitude: ", latLng.lat, "Longitude: ", latLng.lng);
  
          if (mapRef.current) {
            mapRef.current.setCenter(latLng);
  
            if (markerRef.current) {
              markerRef.current.setPosition(latLng);
            } else {
              markerRef.current = new window.google.maps.Marker({
                position: latLng,
                map: mapRef.current,
              });
            }
          }
        } else {
          // Fallback to geocoding if no geometry is available from autocomplete
          geocodeAddress(address);
        }
      });
    } else {
      // Fallback for manually entered address (no selection from dropdown)
      const location = await geocodeAddress(address);
  
      if (!location) {
        console.error("Geocoding failed. No location found for the given address.");
        return;
      }
  
      console.log("Latitude: ", location.lat, "Longitude: ", location.lng);
  
      if (mapRef.current) {
        mapRef.current.setCenter(location);
  
        if (markerRef.current) {
          markerRef.current.setPosition(location);
        } else {
          markerRef.current = new window.google.maps.Marker({
            position: location,
            map: mapRef.current,
          });
        }
      }
    }
  };
  
  const geocodeAddress = async (address: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyBGO7jQRMZ6QVPyZ5Zy8qOdzvmzdrWk`
      );
      const data = await response.json();
  
      if (data.results.length === 0) {
        console.error("No results found for the given address.");
        return null;
      }
  
      return data.results[0].geometry.location;
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      return null;
    }
  };
  
  return (
    <div className="h-full w-full relative">
      <div
        className={`flex justify-center w-full absolute top-14 xl:top-10 z-10 ${
          location.pathname === "/projects/new" ? "hidden" : "flex"
        }`}
      >
        <label className="input input-bordered flex items-center gap-2 w-1/2">
          <input
            type="text"
            className="grow"
            placeholder="Enter an address"
            ref={autocompleteRef}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
            onClick={handleSearch}
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div id="map" className="h-full"></div>
    </div>
  );
});

export default CustomMap;
