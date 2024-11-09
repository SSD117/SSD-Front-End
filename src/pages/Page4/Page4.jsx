// Page4.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Page4.css";
import AppLogo from "../../assets/images/AppImg.png"; 


export default function Page4() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/page4/signup");
  };

  return (
    <div className="login-page">
      <img src={AppLogo} alt="App Logo" className="app-logo" />
      <form className="login-form">
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" placeholder="이메일을 입력하세요" required />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호를 입력하세요" required />

        <button type="submit" className="login-button">로그인</button>
        <button type="button" className="signup-button" onClick={handleSignupClick}>회원가입</button>
      </form>
    </div>
  );
}
