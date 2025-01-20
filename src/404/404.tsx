import React from "react";
import NotFoundImage from "../assets/404.svg";

interface NotFoundProps {
  currentLanguage: "en" | "uz";
}

const NotFound: React.FC<NotFoundProps> = ({ currentLanguage }) => {
  const isSmallScreen = window.innerWidth <= 1024;

  const text = {
    en: {
      title: "Page Not Found",
      description:
        "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
      home: "Home",
    },
    uz: {
      title: "Sahifa topilmadi",
      description:
        "Siz qidirayotgan sahifa nomi o‘zgartirilgan yoki vaqtincha mavjud bo‘lmagan bo‘lsa, o‘chirib tashlangan bo‘lishi mumkin.",
      home: "Bosh sahifa",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <img src={NotFoundImage} alt="404 Not Found" />
      <p style={{ fontSize: "40px", color: "#000", marginTop: "20px" }}>
        {text[currentLanguage].title}
      </p>
      <p
        style={{
          margin: "0 auto",
          width: isSmallScreen ? "80%" : "40%",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        {text[currentLanguage].description}
      </p>
      <a
        href="/"
        style={{
          textDecoration: "none",
          color: "#fff",
          backgroundColor: "#1EB53A",
          padding: "10px 20px",
          borderRadius: "20px",
          marginTop: "20px",
        }}
      >
        {text[currentLanguage].home}
      </a>
    </div>
  );
};

export default NotFound;
