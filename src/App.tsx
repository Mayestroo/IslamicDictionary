import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderBar from "./header/HeaderBar";
import MainComponent from "./main/MainComponent";
import DictionaryApp from "./mobile/DictionaryApp";
import Download from "./download/Download";
import wordsData from "./data/words_data.json"; // Import JSON data
import NotFound from "./404/404";
import WordDetails from "./mobile/WordDetails"; // Import WordDetails component

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState<"uz" | "en">(
    (localStorage.getItem("currentLanguage") as "uz" | "en") || "uz"
  );
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
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
          data={wordsData}
        />

        <Routes>
          <Route
            path="/"
            element={
              isMobile ? (
                <DictionaryApp
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  currentLanguage={currentLanguage}
                  data={wordsData}
                />
              ) : (
                <MainComponent
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  currentLanguage={currentLanguage}
                  data={wordsData}
                />
              )
            }
          />
          <Route
            path="/download"
            element={<Download currentLanguage={currentLanguage} />}
          />
          <Route
            path="/word/:id"
            element={
              <WordDetails
                data={
                  wordsData as Array<{
                    id: number;
                    worduz: string;
                    defenation: string;
                    source: string;
                    image: string;
                    category_id: number;
                    pronun: string | null;
                    type: string;
                    wordeng: string;
                  }>
                }
                words={wordsData}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
