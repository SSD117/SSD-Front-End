import React from "react";
import { useNavigate } from "react-router-dom";
import "./Page4_1.css";

export default function Page4_1() {
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault(); // 폼 제출 방지
    navigate("/page4/signup");
  };

  return (
    <div className="signup-page">
      <h1>회원가입</h1>
      <form className="signup-form">
        <label htmlFor="name">이름</label>
        <input type="text" id="name" placeholder="이름을 입력하세요" required />

        <label htmlFor="phone">전화번호</label>
        <input type="tel" id="phone" placeholder="전화번호를 입력하세요" required />

        <label htmlFor="email">이메일</label>
        <input type="email" id="email" placeholder="이메일을 입력하세요" required />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호를 입력하세요" required />

        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input type="password" id="confirm-password" placeholder="비밀번호를 다시 입력하세요" required />

        <button type="submit" className="signup-submit-button" onClick={handleSignupClick}>회원가입 완료</button>
      </form>
    </div>
  );
}
