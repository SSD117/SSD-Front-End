import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLogo from "../assets/images/AppImg.png";
import api from "../api/api"; // API 모듈 가져오기

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignupClick = () => {
    navigate("/signUp"); // 회원가입 페이지로 이동
  };

  const handleLoginClick = async () => {
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await api.login(email, password);
      alert(response.data.message || "로그인 성공!");
      navigate("/mainPage");
    } catch (error) {
      console.error("Login Error:", error.response || error.message);
      setErrorMessage(error.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-6">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md mb-6 flex flex-col items-center">
        <img
          src={AppLogo}
          alt="App Logo"
          className="w-2/3 h-auto mb-6 object-contain"
        />

        <label
          htmlFor="email"
          className="text-sm text-gray-600 w-full mb-2 block"
        >
          이메일
        </label>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 mb-4 w-full bg-gray-200 text-sm border border-gray-300 rounded focus:outline-none focus:border-main01"
        />

        <label
          htmlFor="password"
          className="text-sm text-gray-600 w-full mb-2 block"
        >
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 mb-4 w-full bg-gray-200 text-sm border border-gray-300 rounded focus:outline-none focus:border-main01"
        />
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}

      <button
        type="submit"
        onClick={handleLoginClick} // 로그인 버튼 클릭 이벤트
        className="p-3 mb-4 w-full max-w-md text-lg text-white bg-main01 border border-main01 rounded shadow-md hover:shadow-lg transition-shadow"
      >
        로그인
      </button>
      <button
        type="button"
        onClick={handleSignupClick} // 회원가입 버튼 클릭 이벤트
        className="p-3 w-full max-w-md text-lg text-main01 bg-white border border-main01 rounded shadow-md hover:shadow-lg transition-shadow"
      >
        회원가입
      </button>
    </div>
  );
}
