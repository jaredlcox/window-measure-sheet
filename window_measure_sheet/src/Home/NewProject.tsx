import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomMap from "./CustomMap";
import { useProjectContext } from "./ProjectContext";
import { useLocation } from "react-router-dom";

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
    resetProject,
    navbarOpen
  } = useProjectContext();
  const location = useLocation();
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [zoom, setZoom] = useState(15);
  const [latLng, setLatLng] = useState<{ lat: number, lng: number } | null>(null);

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

    if (addressInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ["geocode"],
        componentRestrictions: { country: "us" },
      });

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
            mapRef.current.setCenter(latLng);
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
            const streetNumber = addressComponents.find((component: { types: string[] }) =>
              component.types.includes("street_number")
            )?.long_name || "";

            const route = addressComponents.find((component: { types: string[] }) =>
              component.types.includes("route")
            )?.long_name || "";

            const locality = addressComponents.find((component: { types: string[] }) =>
              component.types.includes("locality")
            )?.long_name || "";

            const administrativeArea = addressComponents.find((component: { types: string[] }) =>
              component.types.includes("administrative_area_level_1")
            )?.short_name || "";

            const postalCode = addressComponents.find((component: { types: string[] }) =>
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
  }, [location.pathname, setAddress]);

  const handleCancelProjectClick = () => {
    resetProject();
    navigate("/projects");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Trigger Geocoding API if user has manually entered the address
    if (address) {
      let fullAddress = `${address}, ${city}, ${state} ${zip}`;
      await geocodeManuallyEnteredAddress(fullAddress);
    }
    // Now handle the form submission (e.g., send to backend)
    if (latLng) {
      const formattedLat = shortenLngLtd(latLng.lat);
      const formattedLng = shortenLngLtd(latLng.lng);
      
      console.log({ projectName, address, city, state, zip, latitude: formattedLat, longitude: formattedLng });
    } else {
      console.log({ projectName, address, city, state, zip });
    }
    setZoom(50); // Set zoom to 50 when creating the project
  };

  const geocodeManuallyEnteredAddress = async (address: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyBGO7jQRMZ6QVPyZ5Zy8qOdzvmzdrWk--Q`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        console.error("No results found for the given address.");
        return;
      }

      const location = data.results[0].geometry.location;
      console.log("Geocoded Latitude: ", location.lat, "Longitude: ", location.lng);
      const latLng = { lat: location.lat, lng: location.lng };
      setLatLng(latLng); // Store the latLng in state

      // Center the map on the geocoded location
      if (mapRef.current) {
        mapRef.current.setCenter(latLng);
        mapRef.current.setZoom(50); // Set zoom to 50

        // Set a marker on the map if not already placed
        if (!markerRef.current) {
          markerRef.current = new window.google.maps.Marker({
            position: latLng,
            map: mapRef.current,
          });
        } else {
          markerRef.current.setPosition(latLng);
        }
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full relative bg-neutral-200">
      <div className="hidden xl:flex h-full w-full">
        <CustomMap />
      </div>
      <div className={`flex w-full h-[95%] rounded-md shadow-lg m-10 p-6 xl:w-1/3 xl:absolute xl:right-0 bg-[#FAF7F5] ${navbarOpen ? "hidden" : "flex"}`}>
        <form className="flex h-auto w-full flex-col gap-8" onSubmit={handleSubmit}>
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
            className="input input-bordered w-full rounded-none"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <label className="input input-bordered flex items-center gap-2 rounded-none">
            Address
            <input
              type="text"
              className="grow"
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
              className="grow"
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
                className="w-full"
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
                className="w-full"
                placeholder=""
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary text-white rounded-md md:w-auto">
            <p>Create Project</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProject;