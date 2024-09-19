import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProjectContextProps {
  projectName: string;
  setProjectName: (name: string) => void;
  address: string;
  setAddress: (address: string) => void;
  city: string;
  setCity: (city: string) => void;
  state: string;
  setState: (state: string) => void;
  zip: string;
  setZip: (zip: string) => void;
  latitude: string;
  setLatitude: (latitude: string) => void;
  longitude: string;
  setLongitude: (longitude: string) => void;
  resetProject: () => void;
  navbarOpen: boolean;
  setNavbarOpen: (open: boolean) => void;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projectName, setProjectName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [navbarOpen, setNavbarOpen] = useState(false);

  const resetProject = () => {
    setProjectName("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <ProjectContext.Provider
      value={{
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
        setNavbarOpen,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};