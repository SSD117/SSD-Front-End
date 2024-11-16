import React, { useState } from "react";
import FilterModal from "./FilterModal";
import badmintonImage from "../../assets/images/badminton.png";
import soccerImage from "../../assets/images/soccer.png";
import tennisImage from "../../assets/images/tennis.png";

export default function MainPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="main-page bg-gray-100 min-h-screen flex flex-col items-center">
      <header className="mt-8 text-center">
        <p className="text-lg font-semibold">내 위치 : 광운초등학교</p>
      </header>

      {/* 지도 Placeholder */}
      <div className="w-11/12 h-48 bg-gray-300 my-4 flex items-center justify-center text-lg font-semibold text-gray-600">
        지도?
      </div>

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
        <div className="flex items-center bg-gray-200 rounded-lg p-4">
          <img src={badmintonImage} alt="배드민턴" className="w-10 h-10 mr-4" />
          <div className="flex-1">
            <p className="text-sm font-semibold">배드민턴</p>
            <p className="text-xs text-gray-600">000체육관 (1.2km)</p>
          </div>
          <span className="text-lg text-gray-600">➔</span>
        </div>
        {/* 축구 */}
        <div className="flex items-center bg-gray-200 rounded-lg p-4">
          <img src={soccerImage} alt="축구" className="w-10 h-10 mr-4" />
          <div className="flex-1">
            <p className="text-sm font-semibold">축구</p>
            <p className="text-xs text-gray-600">000체육관 (1.2km)</p>
          </div>
          <span className="text-lg text-gray-600">➔</span>
        </div>
        {/* 테니스 */}
        <div className="flex items-center bg-gray-200 rounded-lg p-4">
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
