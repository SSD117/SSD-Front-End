import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/signUp1");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">회원가입</h1>
      <form className="flex flex-col gap-4 w-full max-w-md">
       
        <label htmlFor="email" className="text-sm text-gray-600">
          이메일
        </label>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력하세요"
          required
          className="p-3 mb-2 w-full text-sm border border-gray-300 rounded focus:outline-none focus:border-main01"
        />

        <label htmlFor="password" className="text-sm text-gray-600">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          required
          className="p-3 mb-2 w-full text-sm border border-gray-300 rounded focus:outline-none focus:border-main01"
        />

        <label htmlFor="confirm-password" className="text-sm text-gray-600">
          비밀번호 확인
        </label>
        <input
          type="password"
          id="confirm-password"
          placeholder="비밀번호를 다시 입력하세요"
          required
          className="p-3 mb-2 w-full text-sm border border-gray-300 rounded focus:outline-none focus:border-main01"
        />

        <button
          type="submit"
          onClick={handleSignupClick}
          className="p-3 w-full text-lg text-white bg-main01 rounded cursor-pointer"
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
}
