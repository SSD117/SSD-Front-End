// FilterModal.jsx
import React from "react";

export default function FilterModal({ isOpen, toggleFilter }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-700 w-80 rounded-lg p-4 text-white">
        <h3 className="text-lg font-semibold mb-4">거리</h3>
        <div className="flex space-x-2 mb-4">
          <button className="bg-gray-500 rounded-full px-3 py-1">1km</button>
          <button className="bg-gray-500 rounded-full px-3 py-1">3km</button>
          <button className="bg-gray-500 rounded-full px-3 py-1">5km</button>
          <button className="bg-gray-500 rounded-full px-3 py-1">7km</button>
        </div>

        <h3 className="text-lg font-semibold mb-4">유형</h3>
        <div className="flex space-x-2 flex-wrap mb-4">
          <button className="bg-gray-500 rounded-full px-3 py-1">배드민턴</button>
          <button className="bg-gray-500 rounded-full px-3 py-1">축구</button>
          <button className="bg-gray-500 rounded-full px-3 py-1">테니스</button>
          <button className="bg-gray-500 rounded-full px-3 py-1">수영</button>
          <button className="bg-gray-500 rounded-full px-3 py-1">농구</button>
          <button className="bg-gray-500 rounded-full px-3 py-1">야구</button>
        </div>

        <h3 className="text-lg font-semibold mb-4">시간</h3>
        <div className="flex space-x-2 mb-4">
          <button className="bg-gray-500 rounded-full px-3 py-1">주중</button>
          <button className="bg-gray-500 rounded-full px-3 py-1">주말</button>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-400 text-gray-900 rounded-lg px-4 py-2"
            onClick={toggleFilter}
          >
            초기화
          </button>
          <button
            className="bg-gray-400 text-gray-900 rounded-lg px-4 py-2"
            onClick={toggleFilter}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
