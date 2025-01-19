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

type WordDetailsProps = {
  data: {
    id: number;

    worduz: string;

    defenation: string;

    source: string;

    image: string;

    category_id: number;

    pronun: string | null;

    type: string;

    wordeng: string;
  }[];

  // other props
  words: WordsData[];
  currentLanguage: string;
};

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
    utterance.lang = currentLanguage === "uz" ? "uz-UZ" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="details">
      <div className="word-details">
        <h2>{currentLanguage === "uz" ? word.worduz : word.wordeng}</h2>
        <div className="word-info">
          <div>
            <p>{currentLanguage === "uz" ? word.worduz : word.wordeng}</p>
            <p>
              <span>{word.type}</span> [{word.pronun ? word.pronun : "N/A"}]
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
              <img src={SoundIcon} alt="Sound Icon" />
            </button>
          </div>
        </div>
        <p className="definition">{word.defenation}</p>
        {word.source && <p className="source">{word.source}</p>}
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
