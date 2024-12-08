import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import badmintonImage from "../../assets/images/badminton.png";
import soccerImage from "../../assets/images/soccer.png";
import tennisImage from "../../assets/images/tennis.png";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import api from "../../api/api";

export default function MainPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [mySchool, setMySchool] = useState("");
  const [sports, setSports] = useState([]);
  const navigate = useNavigate();

  const sportImages = {
    배드민턴: badmintonImage,
    축구: soccerImage,
    테니스: tennisImage,
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
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };

    fetchSports();
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
        {sports.map((sport, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 shadow-md rounded-lg p-4 cursor-pointer"
            onClick={() => navigate(`/detail/${sport.sport_id}`)}
          >
            <img
              src={sportImages[sport.exercise]}
              alt={sport.exercise}
              className="w-10 h-10 mr-4"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{sport.exercise}</p>
              <p className="text-xs text-gray-600">
                {sport.program_name} ({sport.distance.toFixed(2)}km)
              </p>
            </div>
            <span className="text-lg text-gray-600">➔</span>
          </div>
        ))}
      </div>

      {/* 필터 모달 */}
      <FilterModal isOpen={isFilterOpen} toggleFilter={toggleFilter} />
    </div>
  );
}
