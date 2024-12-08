import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"; // API 모듈 import

export default function MyPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [registeredPrograms, setRegisteredPrograms] = useState([]);
  const [recommendedExercises, setRecommendedExercises] = useState([]);

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [editedInfo, setEditedInfo] = useState({
    name: "",
    school: "",
  }); // 수정 중인 정보
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 관리

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.getUser(); // 사용자 정보 가져오기
        console.log(data);
        setUserInfo(data);
      } catch (error) {
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        navigate("/login"); // 로그인 페이지로 리디렉션
      }
    };
    fetchData();
  }, [navigate]);

  // 즐겨찾기한 운동 장소 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.getMyBookmark(); // 사용자 정보 가져오기
        console.log(data);
        setFavoritePlaces(data);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };
    fetchData();
  }, [navigate]);

  // 신청한 스포츠 프로그램 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.getMyClasses(); // 사용자 정보 가져오기
        console.log(data);
        setRegisteredPrograms(data);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };
    fetchData();
  }, [navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedInfo({
      name: userInfo.name,
      school: userInfo.school,
    });
  };

  const handleSaveEdit = async () => {
    try {
      await api.updateUser(editedInfo); // 사용자 정보 업데이트 API 호출
      setUserInfo((prev) => ({
        ...prev,
        ...editedInfo,
      }));
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      setErrorMessage("정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveFavoritePlace = async (place) => {
    const confirmDelete = window.confirm(
      `${place.class_name}을(를) 즐겨찾기에서 삭제하시겠습니까?`
    );
    if (confirmDelete) {
      try {
        await api.cancelBookmark(place.class_id); // 즐겨찾기 삭제 API 호출
        setFavoritePlaces(favoritePlaces.filter((p) => p !== place));
      } catch (error) {
        alert("삭제에 실패했습니다.");
      }
    }
  };

  const handleRemoveProgram = async (program) => {
    const confirmDelete = window.confirm(
      `${program.class_name} 프로그램을 삭제하시겠습니까?`
    );
    if (confirmDelete) {
      try {
        await api.cancelClass(program.class_id); // 프로그램 삭제 API 호출
        setRegisteredPrograms(
          registeredPrograms.filter((p) => p.class_id !== program.class_id)
        );
      } catch (error) {
        alert("삭제에 실패했습니다.");
      }
    }
  };

  const handleViewPassesForExercise = (exercise) => {
    alert(`${exercise} 관련 수강권을 확인합니다.`);
  };

  const handleGoToSurvey = () => {
    navigate("/question");
  };

  if (!userInfo) {
    return null; // 사용자 정보가 로드 중일 때
  }

  return (
    <div className="myPage bg-gray-100 min-h-screen p-6 space-y-6">
      <header className="text-center py-4">
        <h1 className="text-2xl font-bold text-main01">마이페이지</h1>
        <p className="text-gray-600">내 정보를 확인하고 관리하세요.</p>
      </header>

      {/* 회원 정보 */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-main01 mb-3">회원 정보</h2>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-md font-medium text-gray-700">
                이름
              </label>
              <input
                type="text"
                name="name"
                value={editedInfo.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-main01"
              />
            </div>
            <div>
              <label className="block mb-1 text-md font-medium text-gray-700">
                학교
              </label>
              <input
                type="text"
                name="school"
                value={editedInfo.school}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-main01"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                onClick={handleEditToggle}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-main01 text-white rounded-lg hover:bg-main01-light transition"
                onClick={handleSaveEdit}
              >
                저장
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-2">이름: {userInfo.name}</p>
            <p className="mb-4">학교: {userInfo.school}</p>
            <button
              className="px-4 py-2 bg-main01 text-white rounded-lg hover:bg-main01-light transition"
              onClick={handleEditToggle}
            >
              개인정보 수정
            </button>
          </div>
        )}
      </section>

      {/* 나의 수강권 잔액 */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-main01 mb-3">
          나의 수강권 잔액
        </h2>
        <p className="text-gray-700">잔액: {userInfo.balance}</p>
      </section>

      {/* 즐겨찾기한 운동 장소 */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-main01 mb-3">
          즐겨찾기한 스포츠 프로그램
        </h2>
        <ul className="space-y-3">
          {favoritePlaces?.map((place, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md"
            >
              <span>{place.class_name}</span>
              <button
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => handleRemoveFavoritePlace(place)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* 신청한 스포츠 프로그램 */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-main01 mb-3">
          신청한 스포츠 프로그램
        </h2>
        <ul className="space-y-3">
          {registeredPrograms?.map((program, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-3 py-2  rounded-md"
            >
              <span>{program.class_name}</span>
              <button
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => handleRemoveProgram(program)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* 설문으로 추천 받은 운동 */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-main01 mb-3">AI 추천 운동</h2>
        <ul className="space-y-3">
          {userInfo.recommendedExercises?.map((exercise, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-3 py-2  rounded-md"
            >
              <span>{exercise}</span>
              <button
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={() => handleViewPassesForExercise(exercise)}
              >
                관련 수강권 보기
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <button
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={handleGoToSurvey}
          >
            설문조사하기
          </button>
        </div>
      </section>
    </div>
  );
}
