import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSignupClick = (e) => {
    e.preventDefault();

    // 입력 데이터 검증
    if (!formData.email.includes("@")) {
      setErrorMessage("올바른 이메일 주소를 입력하세요.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    // 데이터 검증 통과 시 다음 단계로 이동
    navigate("/signUp1", { state: formData });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">회원가입</h1>
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSignupClick}>
        <label htmlFor="email" className="text-sm text-gray-600">
          이메일
        </label>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력하세요"
          required
          value={formData.email}
          onChange={handleChange}
          className="p-3 mb-2 w-full text-sm border border-gray-300 rounded bg-gray-200 focus:outline-none focus:border-main01"
        />

        <label htmlFor="password" className="text-sm text-gray-600">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          required
          value={formData.password}
          onChange={handleChange}
          className="p-3 mb-2 w-full text-sm border border-gray-300 rounded bg-gray-200 focus:outline-none focus:border-main01"
        />

        <label htmlFor="confirmPassword" className="text-sm text-gray-600">
          비밀번호 확인
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="비밀번호를 다시 입력하세요"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="p-3 mb-2 w-full text-sm border border-gray-300 rounded bg-gray-200 focus:outline-none focus:border-main01"
        />

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          className="p-3 w-full text-lg text-white bg-main01 rounded cursor-pointer"
        >
          다음
        </button>
      </form>
    </div>
  );
}