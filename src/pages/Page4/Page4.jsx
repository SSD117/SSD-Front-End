// Page4.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Page4.css";

export default function Page4() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/page4/Page4_1");
  };

  return (
    <div className="login-page">
      <h1>로그인</h1>
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
