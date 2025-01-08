import { useState } from "react";
import "./MainComponent.css";
import SoundIcon from "../assets/sound.svg";
import search from "../assets/search.svg";
import Modal from "../modal/Modal";


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

interface MainComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentLanguage: string;
  data: DataItem[];
}
function MainComponent({ currentLanguage, searchQuery, setSearchQuery, data }: MainComponentProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  const handlePronounce = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleCategoryClick = (categoryId: number | null) => {
    setActiveCategoryId(categoryId);
  };

  const handleRowClick = (item: DataItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const filteredData = data.filter((item) => {
    const matchesCategory =
      activeCategoryId === null || item.category_id === activeCategoryId;
    const matchesSearch =
      item.worduz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.wordeng.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="main-container">
      <div className="search-bar d-hidden">
        <img src={search} alt="search" className="search-icon" />
        <input
          type="text"
          placeholder={currentLanguage === "uz" ? "Qidirish" : "Search"}
          onChange={(e) => setSearchQuery(e.target.value)}
          readOnly
          className="search-input"
        />
      </div>
      <header className="hidden">
        <h1>
          {currentLanguage === "uz" ? "Islom arkonlari" : "Pillars of Islam"}
        </h1>
      </header>

      <nav className="hidden">
        <ul>
          <li
            className={activeCategoryId === null ? "active" : ""}
            onClick={() => handleCategoryClick(null)}
          >
            <a href="#">{currentLanguage === "uz" ? "Hammasi" : "All"}</a>
          </li>
          {[1, 2, 3, 4, 5].map((categoryId) => (
            <li
              key={categoryId}
              className={activeCategoryId === categoryId ? "active" : ""}
              onClick={() => handleCategoryClick(categoryId)}
            >
              <a href="#">
                {currentLanguage === "uz"
                  ? ["Iymon", "Namoz", "Ro‘za", "Haj", "Zakot"][categoryId - 1]
                  : ["Faith", "Prayer", "Fasting", "Hajj", "Charity"][categoryId - 1]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="table-container">
        <div className="table-header">
          <div className="table-cell">№</div>
          <div className="table-cell">
            {currentLanguage === "uz" ? "So‘z" : "Word"}
          </div>
          <div className="table-cell">
            {currentLanguage === "uz" ? "Tarjima" : "Translation"}
          </div>
          <div className="table-cell">
            {currentLanguage === "uz" ? "O‘qilishi" : "Pronunciation"}
          </div>
          <div className="table-cell">
            {currentLanguage === "uz" ? "Ovoz" : "Audio"}
          </div>
        </div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              className="table-row"
              key={item.id}
              onClick={() => handleRowClick(item)}
            >
              <div className="table-cell">{item.id}</div>
              <div className="table-cell">
                {currentLanguage === "uz" ? item.worduz : item.wordeng}
              </div>
              <div className="table-cell">
                {currentLanguage === "uz" ? item.wordeng : item.worduz}
                <span className="first-letter">&nbsp;({item.type[0]})</span>
              </div>
              <div className="table-cell">[{item.pronun}]</div>
              <div className="table-cell">
                <button
                  className="sound-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePronounce(item.wordeng);
                  }}
                >
                  <img src={SoundIcon} alt="SoundIcon" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            {currentLanguage === "uz" ? "Natija topilmadi" : "No results found"}
          </div>
        )}
      </div>

      {showModal && selectedItem && (
        <Modal show={showModal} data={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default MainComponent;
