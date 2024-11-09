// Splash.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashPage.css"; // 필요에 따라 스타일 적용
import AppLogo from "../../assets/images/AppImg.png"; // 이미지 파일 경로 확인

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후에 MainPage로 이동
    const timer = setTimeout(() => {
      navigate("/mainPage"); // "/main" 경로는 MainPage.jsx의 경로로 설정
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머를 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <img src={AppLogo} alt="App Logo" className="app-logo" />
    </div>
  );
}
