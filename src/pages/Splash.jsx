import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLogo from "../assets/images/AppImg.png"; 

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // 2.5초 후에 Main 이동
    const timer = setTimeout(() => {
      navigate("/mainPage");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
        <img src={AppLogo} alt="App Logo" className="w-1/2 h-auto object-contain" />
    </div>
  );
}
