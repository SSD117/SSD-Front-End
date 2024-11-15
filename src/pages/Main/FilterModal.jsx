// FilterModal.jsx
import React from "react";

export default function FilterModal({ isOpen, toggleFilter }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-end z-[1100] px-4"> {/* 좌우 여백 추가 */}
      <div className="bg-white w-full max-w-sm rounded-t-2xl p-6 text-gray-800 animate-slide-up z-[1100]"> {/* 최대 너비를 sm으로 설정 */}
        <h3 className="text-lg font-semibold mb-4">거리</h3>
        <div className="flex flex-wrap gap-2 mb-4"> {/* 버튼 사이 간격 설정 */}
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">1km</button>
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">3km</button>
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">5km</button>
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">7km</button>
        </div>

        <h3 className="text-lg font-semibold mb-4">유형</h3>
        <div className="flex flex-wrap gap-2 mb-4"> {/* 버튼 사이 간격 설정 */}
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">배드민턴</button>
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">축구</button>
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">테니스</button>
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">수영</button>
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">농구</button>
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">야구</button>
        </div>

        <h3 className="text-lg font-semibold mb-4">시간</h3>
        <div className="flex gap-2 mb-4"> {/* 버튼 사이 간격 설정 */}
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">주중</button>
          <button className="bg-main02 text-main01 rounded-full px-4 py-2">주말</button>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-main02 text-main01 font-semibold rounded-lg px-6 py-2"
            onClick={toggleFilter}
          >
            초기화
          </button>
          <button
            className="bg-main02 text-main01 font-semibold rounded-lg px-6 py-2"
            onClick={toggleFilter}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
