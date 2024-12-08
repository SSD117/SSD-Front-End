import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SignUp_1 = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 이전 단계에서 전달된 데이터 가져오기
  const initialData = location.state || {}; // 이전 데이터가 없으면 빈 객체
  const [formData, setFormData] = useState({
    ...initialData, // 이전 단계 데이터 병합
    name: "",
    phone: "",
    age: "",
    gender: "",
    school: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignupClick = (e) => {
    e.preventDefault();

    // 입력 데이터 검증
    if (!formData.name) {
      setErrorMessage("이름을 입력하세요.");
      return;
    }
    if (!formData.phone.match(/^010-\d{4}-\d{4}$/)) {
      setErrorMessage("전화번호 형식을 확인하세요. (예: 010-1234-5678)");
      return;
    }
    if (!formData.age || isNaN(formData.age) || formData.age <= 0) {
      setErrorMessage("유효한 나이를 입력하세요.");
      return;
    }
    if (!formData.gender) {
      setErrorMessage("성별을 선택하세요.");
      return;
    }
    if (!formData.school) {
      setErrorMessage("학교명을 입력하세요.");
      return;
    }

    // 다음 단계로 이동 및 데이터 전달
    navigate("/signUp2", { state: formData });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 ">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
        회원 정보 입력
      </h2>
      <form onSubmit={handleSignupClick} className="space-y-8">
        {/* 기본 정보 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-main01 border-b-2 border-main01 pb-1">
            기본 정보
          </h3>

          <div>
            <label className="block text-sm text-gray-600">이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full p-3 mb-2 border bg-gray-200 border-gray-300 rounded focus:outline-none focus:border-main01"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">전화번호</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
              className="w-full p-3 mb-2 border bg-gray-200 border-gray-300 rounded focus:outline-none focus:border-main01"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">나이</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              placeholder="나이를 입력하세요"
              className="w-full p-3 mb-2 border bg-gray-200 border-gray-300 rounded focus:outline-none focus:border-main01"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">성별</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleChange("gender", "남자")}
                className={`flex-1 p-3 mb-2 rounded ${
                  formData.gender === "남자"
                    ? "bg-main01 text-white"
                    : "bg-gray-200"
                }`}
              >
                남자
              </button>
              <button
                type="button"
                onClick={() => handleChange("gender", "여자")}
                className={`flex-1 p-3 mb-2 rounded ${
                  formData.gender === "여자"
                    ? "bg-main01 text-white"
                    : "bg-gray-200"
                }`}
              >
                여자
              </button>
              <button
                type="button"
                onClick={() => handleChange("gender", "기타")}
                className={`flex-1 p-3 mb-2 rounded ${
                  formData.gender === "기타"
                    ? "bg-main01 text-white"
                    : "bg-gray-200"
                }`}
              >
                기타
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">학교</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={(e) => handleChange("school", e.target.value)}
              placeholder="학교명을 입력하세요"
              className="w-full p-3 mb-2 border bg-gray-200 border-gray-300 rounded focus:outline-none focus:border-main01"
            />
          </div>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full p-3 text-white bg-main01 rounded cursor-pointer"
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default SignUp_1;
