import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import wordsData from "../data/words_data.json"; // Ensure the path is correct
import SoundIcon from "../assets/sound.svg"; // Adjust path as needed

interface DataItem {
  id: number;
  worduz: string;
  wordeng: string;
  pronun: string | null;
  type: string;
  category_id: number;
  defenation: string;
  source: string;
}

interface DetailPageProps {
  currentLanguage: string;
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
}

const DetailPage: React.FC<DetailPageProps> = ({ currentLanguage }) => {
  const { id } = useParams<{ id: string }>();
  const [wordDetails, setWordDetails] = useState<DataItem | null>(null);

  useEffect(() => {
    if (id) {
      const foundItem = wordsData.find(
        (item: DataItem) => item.id === parseInt(id, 10)
      );
      setWordDetails(foundItem || null);
    }
  }, [id]);

  if (!wordDetails) {
    return <div>No details available for this word.</div>;
  }

  return (
    <div className="word-detail">
      <div className="word-header">
        <h1 className="word-title">
          {currentLanguage === "uz" ? wordDetails.worduz : wordDetails.wordeng}
        </h1>
        <div className="word-translation">
          {currentLanguage === "uz" ? wordDetails.wordeng : wordDetails.worduz}
        </div>
        <div className="word-pronunciation">
          {wordDetails.pronun && <span>[{wordDetails.pronun}]</span>}
          <button className="sound-button">
            <img src={SoundIcon} alt="Pronounce" />
          </button>
        </div>
      </div>
      <div className="word-details">
        <h2>Definition</h2>
        <p className="definition">
          {currentLanguage === "uz"
            ? wordDetails.defenation
            : wordDetails.defenation}
        </p>
        <blockquote className="quote">
          "All praise is for Allah, to Whom belongs whatever is in the heavens
          and whatever is on the earth. And praise be to Him in the Hereafter.
          He is the All-Wise, All-Aware" 34:1.
        </blockquote>
        <p className="source">
          <strong>Source:</strong> {wordDetails.source}
        </p>
      </div>
    </div>
  );
};

export default DetailPage;
