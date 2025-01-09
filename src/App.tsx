import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderBar from "./header/HeaderBar";
import MainComponent from "./main/MainComponent";
import DictionaryApp from "./mobile/DictionaryApp";
import DetailPage from "./detail/DetailPage";
import Download from "./download/Download";
import wordsData from "./data/words_data.json"; // Import JSON data

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState<"uz" | "en">(
    (localStorage.getItem("currentLanguage") as "uz" | "en") || "uz"
  );
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    // Save the selected language in localStorage
    localStorage.setItem("currentLanguage", currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <HeaderBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
        />

        <Routes>
          <Route
            path="*"
            element={
              isMobile ? (
                <DictionaryApp
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  currentLanguage={currentLanguage}
                  data={wordsData} // Pass JSON data
                />
              ) : (
                <MainComponent
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  currentLanguage={currentLanguage}
                  data={wordsData} // Pass JSON data
                />
              )
            }
          />
          <Route
            path="/detail/:id"
            element={
              <DetailPage
                currentLanguage={currentLanguage}
                data={wordsData} // Pass JSON data
              />
            }
          />
          <Route
            path="/download"
            element={<Download currentLanguage={currentLanguage} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
