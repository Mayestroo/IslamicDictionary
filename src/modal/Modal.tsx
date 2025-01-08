import React from "react";
import "./Modal.css"; // Ensure the CSS file has styling for the modal
import SoundIcon from "../assets/sound.svg"; // Import sound icon image or use any sound icon of your choice

interface DataItem {
  worduz: string;
  wordeng: string;
  type: string;
  pronun: string | null;
  defenation: string;
  source: string;
}

interface ModalProps {
  show: boolean;
  data: DataItem | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, data, onClose }) => {
  if (!show || !data) return null;

  const handlePronounce = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">{data.worduz}</h2>
        <br />
        <p className="modal-subtitle">
          {data.wordeng}{" "}
          <button
            className="sound-button"
            onClick={() => handlePronounce(data.wordeng)}
          >
            <img src={SoundIcon} alt="Pronunciation" />
          </button>
        </p>

        <div className="modal-details">
          <p>
            {" "}
            <i>
              {data.type} [{data.pronun}]
            </i>
          </p>
          <br />
          <p className="modal-defination"> {data.defenation}</p>
          <p>
            <i>{data.source}</i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
