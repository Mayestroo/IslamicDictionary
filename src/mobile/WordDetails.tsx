import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SoundIcon from "../assets/sound.svg";
import "./WordDetails.css";

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

interface WordDetailsProps {
  currentLanguage: "uz" | "en";
  words: WordsData[];
}

const WordDetails: React.FC<WordDetailsProps> = ({
  words,
  currentLanguage,
}) => {
  const { id } = useParams<{ id: string }>();
  console.log("Word ID from URL:", id);
  const [isVisible, setIsVisible] = useState(true);
  const word = words.find((w: WordsData) => w.id === parseInt(id || "", 10));
  console.log("Retrieved Word Object:", word);
  console.log("Words Array in WordDetails:", words);
  console.log("Current Language:", currentLanguage);

  if (!word) {
    return <p>Word not found.</p>;
  }

  const handleClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const handlePronounce = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="details">
      {/* <center>
        <h2>{currentLanguage === "uz" ? word.worduz : word.wordeng}</h2>
      </center> */}

      <div className="word-details">
        <p>{word.worduz}</p>
        <div className="word-info">
          <div>
            <p>{word.wordeng}</p>
            <p>
              <span>{word.type}</span> [{word.pronun}]
            </p>
          </div>
          <div>
            <button
              className="sound-button"
              onClick={(e) => {
                e.stopPropagation();
                handlePronounce(word.wordeng);
              }}
            >
              <img src={SoundIcon} alt="SoundIcon" />
            </button>
          </div>
        </div>
        <p className="definition">{word.defenation}</p>
        {word.source && <p className="source"> {word.source}</p>}
      </div>
      <Link to="/" className="back-button" onClick={handleClick}>
        <a className="arrow-left">
          {currentLanguage === "uz" ? "Ortga" : "Back"}
        </a>
      </Link>
    </div>
  );
};

export default WordDetails;
