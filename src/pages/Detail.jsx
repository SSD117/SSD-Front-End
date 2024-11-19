import React, { useState } from "react";

const Detail = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [priceRange, setPriceRange] = useState([50000, 80000]);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleDayClick = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handlePriceChange = (event, type) => {
    const value = parseInt(event.target.value, 10);
    if (type === "min" && value % 5000 === 0) {
      setPriceRange([value, Math.max(value, priceRange[1])]);
    } else if (type === "max" && value % 5000 === 0) {
      setPriceRange([Math.min(value, priceRange[0]), value]);
    }
  };

  return (
    <div className="bg-white min-h-screen p-4 relative">
      <div className="border-b border-gray-300 pb-4 mb-4">
        <h1 className="text-lg font-bold mb-2">내 위치 : 광운초등학교</h1>
        <p className="text-sm text-gray-500">
          댄스 <span className="text-main01">000체육관 (1.2km)</span>
        </p>
      </div>

      {/* 필터와 주중 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <button className="px-4 py-2 bg-main01 text-white text-sm rounded-md">
          주중
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-full ${
            showFilter ? "bg-main01 text-white" : "bg-gray-200 text-black"
          }`}
          onClick={toggleFilter}
        >
          필터
        </button>
      </div>

      {/* 강좌 정보 */}
      <div className="space-y-4">
        {[
          {
            title: "너랑나랑라인댄스",
            days: "월, 수, 금",
            time: "15:00 ~ 15:50",
            price: "36,000",
            period: "2024년 12월 4일 ~ 12월 19일",
            status: "접수중",
          },
          {
            title: "케이팝 댄스",
            days: "화, 목",
            time: "15:00 ~ 15:50",
            price: "36,000",
            period: "2024년 12월 4일 ~ 12월 19일",
            status: "접수중",
          },
          {
            title: "너랑나랑라인댄스",
            days: "목",
            time: "15:00 ~ 15:50",
            price: "36,000",
            period: "2024년 12월 4일 ~ 12월 19일",
            status: "접수전",
          },
        ].map((course, index) => (
          <div
            key={index}
            className="p-4 bg-gray-200 rounded-lg border border-gray-300"
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="font-bold text-lg">{course.title}</h2>
              <button
                className={`px-4 py-2 text-white text-sm rounded ${
                  course.status === "접수중"
                    ? "bg-main01"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {course.status}
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-1">요일 : {course.days}</p>
            <p className="text-sm text-gray-700 mb-1">시간 : {course.time}</p>
            <p className="text-sm text-gray-700 mb-1">수강료 : {course.price}</p>
            <p className="text-sm text-gray-700 mb-3">
              수강 기간 : {course.period}
            </p>
          </div>
        ))}
      </div>

      {/* 필터 모달 */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-end transition-opacity duration-300 ${
          showFilter ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleFilter}
      >
        <div
          className={`bg-white max-w-lg rounded-t-2xl p-6 text-gray-800 transform transition-transform duration-300 ${
            showFilter ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold mb-4">필터</h3>
          {/* 요일 선택 */}
          <div className="mb-4">
            <p className="text-sm font-bold mb-2">요일</p>
            <div className="flex justify-between">
              {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDayClick(day)}
                  className={`w-10 h-10 border rounded-full flex items-center justify-center ${
                    selectedDays.includes(day)
                      ? "bg-main01 text-white"
                      : "bg-gray-200 text-black border-gray-400"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          {/* 수강료 범위 */}
          <div className="mb-4">
            <p className="text-sm font-bold mb-2">수강료</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 w-1/2">
                <label className="text-sm text-gray-600">최소:</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, "min")}
                  className="w-2/3 px-2 py-1 border rounded"
                  step="5000"
                  min="50000"
                  max="80000"
                />
              </div>
              <div className="flex items-center space-x-2 w-1/2">
                <label className="text-sm text-gray-600">최대:</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, "max")}
                  className="w-2/3 px-2 py-1 border rounded"
                  step="5000"
                  min="50000"
                  max="80000"
                />
              </div>
            </div>
          </div>
          {/* 초기화 적용 */}
          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-200 text-black font-semibold rounded-lg px-6 py-2"
              onClick={() => {
                setPriceRange([50000, 80000]);
                setSelectedDays([]);
              }}
            >
              초기화
            </button>
            <button
              className="bg-main01 text-white font-semibold rounded-lg px-6 py-2"
              onClick={toggleFilter}
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
