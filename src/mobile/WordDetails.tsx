import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SoundIcon from "../assets/sound.svg";
import ArrowLeft from "../assets/arrow-left.svg";
import "./WordDetails.css";

interface wordsData {
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
  words: wordsData[];
  currentLanguage: "uz" | "en"; // Add currentLanguage as a prop
}

const WordDetails: React.FC<WordDetailsProps> = ({
  words,
  currentLanguage,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isVisible, setIsVisible] = useState(true);
  const word = words.find((w: wordsData) => w.id === parseInt(id || "", 10));

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
      <center>
        <h2>{currentLanguage === "uz" ? word.worduz : word.wordeng}</h2>
      </center>
      <Link to="/" className="back-button" onClick={handleClick}>
        <img src={ArrowLeft} alt="ArrowLeft" />
      </Link>
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
    </div>
  );
};

export default WordDetails;
