import React from "react";
import NotFoundImage from "../assets/404.svg";

const NotFound: React.FC = () => {
  const isSmallScreen = window.innerWidth <= 1024;
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
        Sahifa topilmadi
      </p>
      <p
        style={{
          margin: "0 auto",
          width: isSmallScreen ? "80%" : "40%",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Siz qidirayotgan sahifa nomi o‘zgartirilgan yoki vaqtincha mavjud
        bo‘lmagan bo‘lsa, o‘chirib tashlangan bo‘lishi mumkin.
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
        Bosh sahifa
      </a>
    </div>
  );
};

export default NotFound;
