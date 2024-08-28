import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Home/Navbar";
import ProjectFeed from "./Home/ProjectFeed";
import NewProject from "Home/NewProject";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar>
        <Routes>
          {/* Redirect the root path to /projects */}
          <Route path="/" element={<Navigate to="/projects" />} />

          {/* Define the /projects route and pass the prop explicitly */}
          <Route
            path="/projects"
            element={<ProjectFeed />} // We will update this line in the Navbar
            
          />
                    <Route
            path="/projects/new"
            element={<NewProject />} // We will update this line in the Navbar
            
          />

          {/* Define the /materials route */}
          {/* <Route path="/materials" element={<Materials />} /> */}

          {/* Define the /map route */}
          {/* <Route path="/map" element={<Map />} /> */}

          {/* You can add more routes here if needed */}
        </Routes>
      </Navbar>
    </Router>
  );
};

export default App;
