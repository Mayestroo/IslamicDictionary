import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import WordList from "./WordList";
import WordDetails from "./WordDetails";
// import './DictionaryApp.css';

interface WordsData {
  id: number;
  worduz: string;
  defenation: string;
  source?: string;
  image?: string;
  category_id: number;
  pronun: string | null;
  type: string;
  wordeng: string;
}

interface DictionaryAppProps {
  searchQuery: string;
  currentLanguage: "uz" | "en";
  data: WordsData[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const DictionaryApp: React.FC<DictionaryAppProps> = ({
  searchQuery,
  currentLanguage,
  data,
  // setSearchQuery,
}) => {
  const [words, setWords] = useState<WordsData[]>([]);

  useEffect(() => {
    // If no data is provided, fetch it from a local JSON file or API.
    if (data.length === 0) {
      fetch("/data/words_data.json") // Replace with the actual path to your data file
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((fetchedData: WordsData[]) => setWords(fetchedData))
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setWords(data);
    }
  }, [data]);

  return (
    <div className="dictionary-app">
      <div className="header-section"></div>
      <Routes>
        <Route
          path="/"
          element={
            <WordList
              words={words}
              searchTerm={searchQuery}
              currentLanguage={currentLanguage}
              onWordClick={(word) => console.log(word)}
            />
          }
        />
        <Route
          path="/word/:id"
          element={
            <WordDetails words={words} currentLanguage={currentLanguage} />
          }
        />
      </Routes>
    </div>
  );
};

export default DictionaryApp;
