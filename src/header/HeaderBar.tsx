import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderBar.css";
import logoImage from "../assets/logo.png";
import uz from "../assets/uzb.svg";
import en from "../assets/eng.svg";
import download from "../assets/download.svg";
import search from "../assets/search.svg";

interface HeaderBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  currentLanguage: string;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
  
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  searchQuery,
  setSearchQuery,
  currentLanguage,
  setCurrentLanguage,
}) => {
  const navigate = useNavigate();

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const handleDownloadClick = () => {
    navigate("/download");
  };

  return (
    <div className="header-container">
      <header className="header-bar">
        <div className="logo">
          <a href="/"><img src={logoImage} alt="Logo" /></a>
        </div>

        <div className="search-bar hidden">
          <img src={search} alt="search" className="search-icon " />
          <input
            type="text"
            placeholder={currentLanguage === "uz" ? "Qidirish" : "Search"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="right-section">
          <a href="#" className="about-link">
            {currentLanguage === "uz" ? "Biz haqimizda" : "About Us"}
          </a>
          <div className="language-dropdown">
            <button className="dropdown-toggle">
              <img
                src={currentLanguage === "uz" ? uz : en}
                alt={currentLanguage === "uz" ? "Uzbek" : "English"}
                className="dropdown-icon"
              />
              {currentLanguage === "uz" ? "O‘zb" : "Eng"}
            </button>
            <ul className="dropdown-menu">
              <li
                className="dropdown-item"
                onClick={() => handleLanguageChange("uz")}
              >
                <img src={uz} alt="Uzbek" className="dropdown-icon" /> O‘zb
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleLanguageChange("en")}
              >
                <img src={en} alt="English" className="dropdown-icon" /> Eng
              </li>
            </ul>
          </div>

          <button className="download-button" onClick={handleDownloadClick}>
            <img src={download} alt="" className="download-icon" />
            <span>
              {currentLanguage === "uz" ? "Yuklab olish" : "Download"}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default HeaderBar;
