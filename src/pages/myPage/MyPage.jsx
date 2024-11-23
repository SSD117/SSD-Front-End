import React from "react";

export default function MyPage() {
  const userInfo = {
    name: "홍길동",
    mySchool: "광운초등학교",
    balance: "10회",
    favoritePlaces: ["광운체육관", "서울스포츠센터"],
    registeredPrograms: ["배드민턴", "축구"],
  };

  return (
    <div className="myPage bg-gray-100 min-h-screen p-4">
      <header className="text-center py-4">
        <h1 className="text-2xl font-bold text-main01">마이페이지</h1>
        <p className="text-gray-600">내 정보를 확인하고 관리하세요.</p>
      </header>

      {/* 회원 정보 */}
      <section className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold text-main01 mb-2">회원 정보</h2>
        <p>이름: {userInfo.name}</p>
        <p>학교: {userInfo.mySchool}</p>
        <button className="mt-2 px-4 py-2 bg-main01 text-white rounded-md hover:bg-main01-light">
          개인정보 수정
        </button>
      </section>

      {/* 나의 수강권 잔액 */}
      <section className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold text-main01 mb-2">나의 수강권 잔액</h2>
        <p className="text-gray-700">잔여 횟수: {userInfo.balance}</p>
      </section>

      {/* 즐겨찾기한 운동 장소 */}
      <section className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold text-main01 mb-2">즐겨찾기한 운동 장소</h2>
        <ul className="list-disc list-inside text-gray-700">
          {userInfo.favoritePlaces.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
      </section>

      {/* 신청한 스포츠 프로그램 */}
      <section className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-main01 mb-2">신청한 스포츠 프로그램</h2>
        <ul className="list-disc list-inside text-gray-700">
          {userInfo.registeredPrograms.map((program, index) => (
            <li key={index}>{program}</li>
          ))}
        </ul>
        <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          회원 탈퇴
        </button>
      </section>
    </div>
  );
}
