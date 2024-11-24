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

  const handleAddToFavorites = (course) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.title === course.title
    );

    if (!isAlreadyFavorite) {
      favorites.push(course);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${course.title}이(가) 즐겨찾기에 추가되었습니다.`);
    } else {
      alert(`${course.title}은(는) 이미 즐겨찾기에 추가되어 있습니다.`);
    }
  };

  const courses = [
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
  ];

  return (
    <div className="bg-white min-h-screen p-4 relative">
      <div className="border-b border-gray-300 pb-4 mb-4">
        <h1 className="text-lg font-bold mb-2">내 위치 : 광운초등학교</h1>
        <p className="text-sm text-gray-500">
          댄스 <span className="text-main01">000체육관 (1.2km)</span>
        </p>
      </div>

      <div className="space-y-4">
        {courses.map((course, index) => (
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
            <button
              onClick={() => handleAddToFavorites(course)}
              className="bg-main01 text-white px-4 py-2 rounded"
            >
              즐겨찾기 추가
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
