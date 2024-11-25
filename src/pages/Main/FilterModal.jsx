import React, { useState } from "react";

export default function FilterModal({ isOpen, toggleFilter }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!isOpen) return null;

  const handleTypeClick = (type) => {
    setSelectedType(selectedType === type ? "" : type);
  };

  const handleDistanceClick = (distance) => {
    setSelectedDistance(selectedDistance === distance ? "" : distance);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(selectedTime === time ? "" : time);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-end z-50 px-4">
      <div className="bg-white w-full max-w-sm rounded-t-2xl p-6 text-gray-800 transition-transform duration-300 transform translate-y-0">
        <h3 className="text-lg font-semibold mb-4">거리</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {["1km", "3km", "5km", "7km"].map((distance) => (
            <button
              key={distance}
              onClick={() => handleDistanceClick(distance)}
              className={`px-4 py-2 rounded-full ${
                selectedDistance === distance
                  ? "bg-main01 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {distance}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-4">유형</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {["배드민턴", "축구", "테니스", "수영", "농구", "야구"].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeClick(type)}
              className={`px-4 py-2 rounded-full ${
                selectedType === type
                  ? "bg-main01 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-4">시간</h3>
        <div className="flex gap-2 mb-4">
          {["주중", "주말"].map((time) => (
            <button
              key={time}
              onClick={() => handleTimeClick(time)}
              className={`px-4 py-2 rounded-full ${
                selectedTime === time
                  ? "bg-main01 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-200 text-black font-semibold rounded-lg px-6 py-2"
            onClick={() => {
              setSelectedDistance("");
              setSelectedType("");
              setSelectedTime("");
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
  );
}
