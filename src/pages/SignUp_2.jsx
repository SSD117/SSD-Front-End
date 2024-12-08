import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api"; // API 모듈 가져오기

const SignUp_2 = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 이전 단계 데이터를 가져옴
  const initialData = location.state || {}; // 이전 단계 데이터가 없으면 빈 객체 사용

  const [formData, setFormData] = useState({
    ...initialData, // 이전 단계 데이터를 병합
    height: "",
    weight: "",
    experience: "",
    exercies: [],
    rating: "일반", // 기본 값으로 "일반" 설정
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestToggle = (exercise) => {
    setFormData((prevData) => {
      const exercies = prevData.exercies.includes(exercise)
        ? prevData.exercies.filter((item) => item !== exercise)
        : [...prevData.exercies, exercise];
      return { ...prevData, exercies };
    });
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();

    // 입력 데이터 검증
    if (!formData.height || isNaN(formData.height) || formData.height <= 0) {
      setErrorMessage("유효한 키를 입력하세요.");
      return;
    }
    if (!formData.weight || isNaN(formData.weight) || formData.weight <= 0) {
      setErrorMessage("유효한 몸무게를 입력하세요.");
      return;
    }
    if (!formData.experience) {
      setErrorMessage("운동 경험을 선택하세요.");
      return;
    }
    if (formData.exercies.length === 0) {
      setErrorMessage("최소 하나의 관심사를 선택하세요.");
      return;
    }

    try {
      // API 호출
      await api.register(formData);
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "회원가입에 실패했습니다."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
        신체 정보 입력
      </h2>
      <form onSubmit={handleSignupClick} className="space-y-8">
        {/* 신체 정보 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-main01 border-b-2 border-main01 pb-1">
            신체 정보
          </h3>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600">키 (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={(e) => handleChange("height", e.target.value)}
                placeholder="키를 입력하세요."
                className="w-full p-3 mb-2 border bg-gray-200 border-gray-300 rounded focus:outline-none focus:border-main01"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600">몸무게 (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                placeholder="몸무게를 입력하세요."
                className="w-full p-3 mb-2 border bg-gray-200 border-gray-300 rounded focus:outline-none focus:border-main01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">
              운동 경험 유무
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleChange("experience", "있음")}
                className={`flex-1 p-3 mb-2 rounded ${
                  formData.experience === "있음"
                    ? "bg-main01 text-white"
                    : "bg-gray-200"
                }`}
              >
                있음
              </button>
              <button
                type="button"
                onClick={() => handleChange("experience", "없음")}
                className={`flex-1 p-3 mb-2 rounded ${
                  formData.experience === "없음"
                    ? "bg-main01 text-white"
                    : "bg-gray-200"
                }`}
              >
                없음
              </button>
            </div>
          </div>

          {/* 관심사 */}
          <div>
            <label className="block text-sm text-gray-600">관심사</label>
            <div className="flex flex-wrap gap-2">
              {[
                "수영",
                "축구",
                "배드민턴",
                "탁구",
                "농구",
                "스케이트",
                "테니스",
                "기타",
              ].map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 mb-2 rounded ${
                    formData.exercies.includes(interest)
                      ? "bg-main01 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full p-3 text-white bg-main01 rounded cursor-pointer"
        >
          완료
        </button>
      </form>
    </div>
  );
};

export default SignUp_2;
