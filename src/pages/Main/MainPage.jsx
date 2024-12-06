import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import badmintonImage from "../../assets/images/badminton.png";
import soccerImage from "../../assets/images/soccer.png";
import tennisImage from "../../assets/images/tennis.png";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";

export default function MainPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const navigate = useNavigate();

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // 배너 전환 로직
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === 0 ? 1 : 0));
    }, 2500); 
    return () => clearInterval(interval);
  }, []);

  // 배너 데이터
  const banners = [
    { src: banner1, link: "https://svoucher.kspo.or.kr/main.do" },
    { src: banner2, link: "/question" },
  ];

  return (
    <div className="main-page bg-white min-h-screen flex flex-col items-center">
      {/* 학교 정보 섹션 */}
      <div className="w-11/12 bg-gray-100 rounded-lg p-4 mt-4 text-center">
        <p className="text-lg font-semibold">내 학교 : 광운중학교</p>
      </div>

      <div className="relative w-11/12 h-48 overflow-hidden my-4">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <a
              key={index}
              href={banner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex-shrink-0"
            >
              <img
                src={banner.src}
                alt={`배너 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>
      </div>

      {/* 나에게 맞는 운동 찾기 버튼 */}
      <button
        className="text-white bg-main01 rounded-lg px-28 py-2 my-4"
        onClick={() => navigate(`/question`)}
      >
        나에게 맞는 운동 찾기
      </button>

      {/* 프로그램 섹션 */}
      <div className="w-11/12 flex justify-between items-center my-2">
        <h2 className="text-lg font-semibold">체육 프로그램</h2>
        <button
          className="text-white bg-main01 rounded-full px-4 py-1"
          onClick={toggleFilter}
        >
          필터
        </button>
      </div>

      {/* 프로그램 리스트 */}
      <div className="w-11/12 space-y-2">
        {/* 배드민턴 */}
        <div
          className="flex items-center bg-gray-100 shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => navigate(`/detail`)}
        >
          <img src={badmintonImage} alt="배드민턴" className="w-10 h-10 mr-4" />
          <div className="flex-1">
            <p className="text-sm font-semibold">배드민턴</p>
            <p className="text-xs text-gray-600">000체육관 (1.2km)</p>
          </div>
          <span className="text-lg text-gray-600">➔</span>
        </div>
        {/* 축구 */}
        <div
          className="flex items-center bg-gray-100 shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => navigate(`/detail`)}
        >
          <img src={soccerImage} alt="축구" className="w-10 h-10 mr-4" />
          <div className="flex-1">
            <p className="text-sm font-semibold">축구</p>
            <p className="text-xs text-gray-600">000체육관 (1.2km)</p>
          </div>
          <span className="text-lg text-gray-600">➔</span>
        </div>
        {/* 테니스 */}
        <div
          className="flex items-center bg-gray-100 shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => navigate(`/detail`)}
        >
          <img src={tennisImage} alt="테니스" className="w-10 h-10 mr-4" />
          <div className="flex-1">
            <p className="text-sm font-semibold">테니스</p>
            <p className="text-xs text-gray-600">000체육관 (1.2km)</p>
          </div>
          <span className="text-lg text-gray-600">➔</span>
        </div>
      </div>

      {/* 필터 모달 */}
      <FilterModal isOpen={isFilterOpen} toggleFilter={toggleFilter} />
    </div>
  );
}
