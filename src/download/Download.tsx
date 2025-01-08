import React from "react";
import "./Download.css";
import phone from "../assets/phone.png";
import apk from "../assets/apk.svg";
import { FaApple, FaGooglePlay } from "react-icons/fa";

interface DownloadProps {
  currentLanguage: string; // Prop for language
}

const Download: React.FC<DownloadProps> = ({ currentLanguage }) => {
  return (
    <div className="container">
      <div className="content">
        <div className="qr-section">
          <h1>
            {currentLanguage === "uz"
              ? "QR kodni telefoningiz yordamida skaner qiling"
              : "Scan the QR code using your phone"}
          </h1>
          <div className="qr-code">
            <img src="/path-to-qr-code.png" alt="QR Code" />
          </div>
          <div className="download-buttons">
            <button className="app-store">
              <FaApple className="button-icon" />
              {currentLanguage === "uz" ? "App Store" : "App Store"}
            </button>
            <button className="google-play">
              <FaGooglePlay className="button-icon" />
              {currentLanguage === "uz" ? "Google Play" : "Google Play"}
            </button>
            <button className="apk-file">
              <img src={apk} alt="APK" />
              {currentLanguage === "uz" ? "APK fayl" : "APK file"}
            </button>
          </div>
        </div>
        <div className="phones-section">
          <img src={phone} alt="Phone" className="phone phone-left" />
        </div>
      </div>
    </div>
  );
};

export default Download;
