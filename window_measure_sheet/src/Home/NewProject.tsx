import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectContext } from "./ProjectContext";
import { useLocation } from "react-router-dom";

// Define GeoJSON types
interface GeoJSONGeometry {
  type: string;
  coordinates: number[][][];
}

interface GeoJSONFeature {
  id: number;
  name: string;
  properties: Record<string, any>;
  geometry: GeoJSONGeometry;
}

const shortenLngLtd = (num: number) => {
  return num.toFixed(4);
};

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const {
    projectName,
    setProjectName,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    resetProject,
    navbarOpen,
  } = useProjectContext();
  const location = useLocation();
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [zoom, setZoom] = useState(15);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [geojsonData, setGeojsonData] = useState<GeoJSONFeature[]>([]);  // Updated type

  // Map initialization
  useEffect(() => {
    if (mapRef.current === null) {
      const map = new window.google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 41.819, lng: -83.654 }, // Center near the polygons
          zoom: zoom,
          mapTypeId: "satellite",
          tilt: 0,
          gestureHandling: "greedy",
          disableDefaultUI: location.pathname === "/projects/new" ? true : false,
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

    if (addressInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "us" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const location = place.geometry.location;
          const latLng = { lat: location.lat(), lng: location.lng() };
          setLatLng(latLng); // Store the latLng in state
          setAddress(place.formatted_address);

          // Log the latitude and longitude
          console.log("Latitude: ", latLng.lat, "Longitude: ", latLng.lng);

          if (mapRef.current) {
            // mapRef.current.setCenter(latLng);
            mapRef.current.setZoom(50); // Set zoom to 50

            if (markerRef.current) {
              markerRef.current.setPosition(latLng);
            } else {
              markerRef.current = new window.google.maps.Marker({
                position: latLng,
                map: mapRef.current,
              });
            }
          }

          // Populate other fields from the address_components
          const addressComponents = place.address_components;
          if (addressComponents) {
            const streetNumber =
              addressComponents.find((component: { types: string[] }) =>
                component.types.includes("street_number")
              )?.long_name || "";

            const route =
              addressComponents.find((component: { types: string[] }) =>
                component.types.includes("route")
              )?.long_name || "";

            const locality =
              addressComponents.find((component: { types: string[] }) =>
                component.types.includes("locality")
              )?.long_name || "";

            const administrativeArea =
              addressComponents.find((component: { types: string[] }) =>
                component.types.includes("administrative_area_level_1")
              )?.short_name || "";

            const postalCode =
              addressComponents.find((component: { types: string[] }) =>
                component.types.includes("postal_code")
              )?.long_name || "";

            setAddress(`${streetNumber} ${route}`.trim());
            setCity(locality);
            setState(administrativeArea);
            setZip(postalCode);
          }
        }
      });
    }
  }, [location.pathname, zoom]);

  // Overlay GeoJSON Data on the Map
  useEffect(() => {
    if (geojsonData.length > 0 && mapRef.current) {
      geojsonData.forEach((polygonObj) => {
        const geom = polygonObj.geometry;
  
        if (!geom || !geom.coordinates || !geom.coordinates[0]) {
          console.error("Invalid geometry data", geom);
          return;
        }
  
        const coords = geom.coordinates[0].map((coord: number[]) => {
          if (coord.length === 2) {
            return { lat: coord[1], lng: coord[0] };
          }
          console.error("Invalid coord", coord);
          return { lat: 0, lng: 0 };
        });
  
        // Create the polygon
        const poly = new window.google.maps.Polygon({
          paths: coords,
          strokeColor: "#FF0000", // Red stroke initially
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "red", // Red fill initially
          fillOpacity: 0.35,
          editable: false, // Not editable initially
        });
  
        poly.setMap(mapRef.current);
  
        // Adjust bounds to fit the polygon
        const bounds = new window.google.maps.LatLngBounds();
        coords.forEach((coord: any) => bounds.extend(coord));
        if (mapRef.current) {
          mapRef.current.fitBounds(bounds);
        }
  
        // On click, change fill and stroke color to green, make editable
        window.google.maps.event.addListener(poly, "click", () => {
          poly.setOptions({
            fillColor: "green",
            strokeColor: "green",
            editable: true,
          });
        });
  
        // On double-click, revert fill and stroke color to red, disable editing
        window.google.maps.event.addListener(poly, "dblclick", () => {
          poly.setOptions({
            fillColor: "red",
            strokeColor: "red",
            editable: false,
          });
        });
      });
    }
  }, [geojsonData]);
  
    
  const handleCancelProjectClick = () => {
    resetProject();
    navigate("/projects");
  };

  const geocodeManuallyEnteredAddress = async (address: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBGO7jQRMZ6QVPyZ5Zy8qOdzvmzdrWk--Q`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        console.error("No results found for the given address.");
        return null;
      }

      const location = data.results[0].geometry.location;
      console.log(location);

      if (mapRef.current) {
        mapRef.current.setCenter(location);
        mapRef.current.setZoom(50);

        if (!markerRef.current) {
          markerRef.current = new window.google.maps.Marker({
            position: location,
            map: mapRef.current,
          });
        } else {
          markerRef.current.setPosition(location);
        }
      }

      return location;
    } catch (error) {
      console.error("Geocoding failed:", error);
      return null;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let latLngResult = null;

    if (address) {
      let fullAddress = `${address}, ${city}, ${state} ${zip}`;
      latLngResult = await geocodeManuallyEnteredAddress(fullAddress);
    }

    if (latLngResult) {
      const formattedLat = shortenLngLtd(latLngResult.lat);
      const formattedLng = shortenLngLtd(latLngResult.lng);
      setLatitude(formattedLat);
      setLongitude(formattedLng);

      try {
        const response = await fetch(`http://localhost:5000/api/geo-data?lat=${formattedLat}&long=${formattedLng}`);
        const geojsonData = await response.json();
        console.log('GeoJSON data:', geojsonData);
        setGeojsonData(geojsonData);
      } catch (error) {
        console.error('Failed to fetch GeoJSON data:', error);
      }
    } else {
      console.log({ projectName, address, city, state, zip });
    }

    setZoom(50);
  };

  return (
    <div className="flex justify-center items-center h-full w-full relative bg-neutral-200">
      <div id="map" className="h-full w-full"></div> {/* This is the map div */}
      <div className={`flex w-full h-[95%] rounded-md shadow-lg m-10 p-6 xl:w-1/3 xl:absolute xl:right-0 bg-[#FAF7F5] ${navbarOpen ? "hidden" : "flex"}`}>
      <form
          className="flex h-auto w-full flex-col gap-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row w-full h-20 justify-between items-center">
            <h1 className="text-2xl font-bold">Create New Project</h1>
            <button
              type="button"
              onClick={handleCancelProjectClick}
              className="btn btn-secondary text-white rounded-md md:w-auto"
            >
              <p>Cancel</p>
            </button>
          </div>
          <input
            type="text"
            placeholder="Project Name"
            className="input input-bordered w-full rounded-none capitalize"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <label className="input input-bordered flex items-center gap-2 rounded-none">
            Address
            <input
              type="text"
              className="grow capitalize active:bg-transparent"
              placeholder=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              ref={addressInputRef}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 rounded-none">
            City
            <input
              type="text"
              className="grow capitalize"
              placeholder=""
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <div className="flex flex-row gap-2 overflow-hidden">
            <label className="input input-bordered flex items-center gap-2 rounded-none w-full sm:w-1/2">
              State
              <input
                type="text"
                className="w-full capitalize"
                placeholder=""
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 rounded-none w-full sm:w-1/2">
              Zip
              <input
                type="text"
                className="w-full capitalize"
                placeholder=""
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary text-white rounded-md md:w-auto"
          >
            <p>Create Project</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
