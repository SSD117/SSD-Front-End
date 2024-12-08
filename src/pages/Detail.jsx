import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import api from "../api/api";

const Detail = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDay, setSelectedDay] = useState([]);
  const [priceRange, setPriceRange] = useState([50000, 80000]);
  const [favorites, setFavorites] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sportDetails, setSportDetails] = useState([]);

  // URL 매개변수에서 sport_id 받기
  const { sport_id } = useParams();

  // 프로그램 데이터 가져오기
  useEffect(() => {
    const fetchSportDetails = async () => {
      try {
        const { data } = await api.getSportDetail(sport_id); // API 호출
        // 각 클래스에 isRegistered 상태 추가
        const updatedSports = data.sports.map((course) => ({
          ...course,
          isRegistered: false, // 초기 상태에서는 모두 등록되지 않음
        }));
        setSportDetails(updatedSports); // 상태 업데이트
        console.log(data.sports);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };

    fetchSportDetails();
  }, [sport_id]);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleDayClick = (day) => {
    if (selectedDay.includes(day)) {
      setSelectedDay(selectedDay.filter((d) => d !== day));
    } else {
      setSelectedDay([...selectedDay, day]);
    }
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(selectedStatus === status ? "" : status);
  };

  const handlePriceChange = (event, type) => {
    const value = parseInt(event.target.value, 10);
    if (type === "min" && value % 5000 === 0) {
      setPriceRange([value, Math.max(value, priceRange[1])]);
    } else if (type === "max" && value % 5000 === 0) {
      setPriceRange([Math.min(value, priceRange[0]), value]);
    }
  };

  const handleFavoriteToggle = (classId) => {
    if (favorites.includes(classId)) {
      setFavorites(favorites.filter((id) => id !== classId));
    } else {
      setFavorites([...favorites, classId]);
    }
  };

  const handleRegisterClassToggle = async (classId) => {
    // 등록 처리 API 호출
    await api.registerClass(classId);

    // 등록된 클래스를 업데이트하여 버튼 비활성화
    setSportDetails((prevDetails) =>
      prevDetails.map((course) =>
        course.class_id === classId
          ? { ...course, isRegistered: true } // 등록된 클래스는 isRegistered true로 업데이트
          : course
      )
    );
  };

  return (
    <div className="bg-white min-h-screen p-4 relative">
      <div className="border-b border-gray-300 pb-4 mb-4">
        <p className="text-xl font-semibold">강좌 상세 정보</p>
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
        {sportDetails.map((course, index) => (
          <div key={course.class_id} className="p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-lg">{course.program_name}</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleFavoriteToggle(course.class_id)}
                  className="text-2xl focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={
                      favorites.includes(course.title)
                        ? solidHeart
                        : regularHeart
                    }
                    className={`${
                      favorites.includes(course.title)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                <button
                  className={`px-4 py-2 text-white text-sm rounded ${"bg-main01"}`}
                >
                  {course.status}
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-1">요일 : {course.day}</p>
            <p className="text-sm text-gray-700 mb-1">시간 : {course.time}</p>
            <p className="text-sm text-gray-700 mb-1">
              수강료 : {course.price}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              수강 기간 : {course.begin + "~" + course.end}
            </p>

            {/* 신청하기 버튼 */}
            <div className="mt-4">
              <button
                onClick={() => handleRegisterClassToggle(course.class_id)}
                disabled={course.isRegistered} // 등록된 경우 버튼 비활성화
                className={`w-full px-4 py-2 text-white font-bold rounded ${
                  course.isRegistered
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-main01 hover:bg-main02"
                }`}
              >
                {course.isRegistered ? "신청 완료" : "신청하기"}
              </button>
            </div>
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

          {/* 접수 상태 선택 */}
          <div className="mb-4">
            <p className="text-sm font-bold mb-2">접수 상태</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleStatusClick("접수중")}
                className={`px-4 py-2 rounded-full ${
                  selectedStatus === "접수중"
                    ? "bg-main01 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                접수중
              </button>
              <button
                onClick={() => handleStatusClick("접수전")}
                className={`px-4 py-2 rounded-full ${
                  selectedStatus === "접수전"
                    ? "bg-main01 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                접수전
              </button>
            </div>
          </div>

          {/* 요일 선택 */}
          <div className="mb-4">
            <p className="text-sm font-bold mb-2">요일</p>
            <div className="flex justify-between">
              {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDayClick(day)}
                  className={`w-10 h-10 border rounded-full flex items-center justify-center ${
                    selectedDay.includes(day)
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
                  className="w-2/3 px-2 py-1 bg-gray-200 border rounded"
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
                  className="w-2/3 px-2 py-1 bg-gray-200 border rounded"
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
                setSelectedDay([]);
                setSelectedStatus("");
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
