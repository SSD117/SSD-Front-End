import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import badmintonImage from "../../assets/images/badminton.png";
import soccerImage from "../../assets/images/soccer.png";
import tennisImage from "../../assets/images/tennis.png";
import basketballImage from "../../assets/images/basketball.png";
import swimmingImage from "../../assets/images/swimming.png";
import footballImage from "../../assets/images/football.png";
import gymImage from "../../assets/images/gym.png";
import yogaImage from "../../assets/images/yoga.png";
import basicImage from "../../assets/images/basic.png";

import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import api from "../../api/api";

export default function MainPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [mySchool, setMySchool] = useState("");
  const [sports, setSports] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    selectedType: "",
    selectedDistance: "",
    selectedTime: "",
  });
  const navigate = useNavigate();

  const sportImages = {
    배드민턴: badmintonImage,
    축구: soccerImage,
    테니스: tennisImage,
    농구: basketballImage,
    수영: swimmingImage,
    풋살: footballImage,
    헬스: gymImage,
    요가및필라테스: yogaImage,
  };

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

  // 학교 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.getUser();
        setMySchool(data.school);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 프로그램 데이터 가져오기
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const { data } = await api.getSports(); // API 호출
        setSports(data.sports); // 상태 업데이트
        setFilteredSports(data.sports); // 필터링된 데이터 초기화
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };

    fetchSports();
  }, []);

  // 필터 적용
  const applyFilters = (filters) => {
    setFilterOptions(filters);

    // 필터링 로직
    const filtered = sports.filter((sport) => {
      const matchesType =
        !filters.selectedType || sport.exercise === filters.selectedType;
      const matchesDistance =
        !filters.selectedDistance ||
        parseFloat(sport.distance) <= parseFloat(filters.selectedDistance);
      const matchesTime =
        !filters.selectedTime || sport.time === filters.selectedTime;

      return matchesType && matchesDistance && matchesTime;
    });

    setFilteredSports(filtered);
    setIsFilterOpen(false); // 필터 모달 닫기
  };

  // 배너 데이터
  const banners = [
    { src: banner1, link: "https://svoucher.kspo.or.kr/main.do" },
    { src: banner2, link: "/question" },
  ];

  return (
    <div className="main-page bg-white min-h-screen flex flex-col items-center">
      {/* 학교 정보 섹션 */}
      <div className="w-11/12 bg-gray-100 rounded-lg p-4 mt-4 text-center">
        <p className="text-lg font-semibold">내 학교 : {mySchool}</p>
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
        {filteredSports.map((sport, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 shadow-md rounded-lg p-4 cursor-pointer"
            onClick={() => navigate(`/detail/${sport.sport_id}`)}
          >
            {/* 기본 이미지 처리 */}
            <img
              src={sportImages[sport.exercise] || basicImage} // 매핑되지 않은 경우 기본 이미지
              alt={sport.exercise || "기본 운동"}
              className="w-10 h-10 mr-4"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{sport.exercise || "알 수 없는 운동"}</p>
              <p className="text-xs text-gray-600">
                {sport.program_name || "프로그램 정보 없음"} ({sport.distance?.toFixed(2) || "0.00"}km)
              </p>
            </div>
            <span className="text-lg text-gray-600">➔</span>
          </div>
        ))}
      </div>

      {/* 필터 모달 */}
      <FilterModal
        isOpen={isFilterOpen}
        toggleFilter={toggleFilter}
        filterOptions={filterOptions}
        onFilterChange={applyFilters}
      />
    </div>
  );
}