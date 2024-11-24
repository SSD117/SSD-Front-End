import React, { useState } from "react";

const initialFriends = [
  { id: 1, nickname: "JohnDoe", program: "축구" },
  { id: 2, nickname: "JaneDoe", program: "배드민턴" },
  // 친구 목록이 많을 경우 더 추가해도 됩니다.
];

export default function SocialPage() {
  const [friends, setFriends] = useState(initialFriends); // 친구 목록 상태
  const [newFriendNickname, setNewFriendNickname] = useState(""); // 새로운 친구 닉네임 입력 상태
  const [program, setProgram] = useState(""); // 체육 프로그램 입력 상태
  const [nickname, setNickname] = useState(""); // 닉네임 수정 상태

  const addFriend = () => {
    if (!newFriendNickname || !program) {
      alert("닉네임과 체육 프로그램을 입력하세요.");
      return;
    }

    const newFriend = {
      id: friends.length + 1,
      nickname: newFriendNickname,
      program: program,
    };

    setFriends([...friends, newFriend]);
    setNewFriendNickname(""); // 입력 필드 초기화
    setProgram(""); // 체육 프로그램 초기화
  };

  const deleteFriend = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id)); // 친구 삭제
  };

  const updateNickname = (id) => {
    const updatedFriends = friends.map((friend) =>
      friend.id === id ? { ...friend, nickname: nickname } : friend
    );
    setFriends(updatedFriends);
    setNickname(""); // 닉네임 입력 필드 초기화
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        소셜 페이지
      </h1>

      {/* 친구 추가 섹션 */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">친구 추가</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={newFriendNickname}
            onChange={(e) => setNewFriendNickname(e.target.value)}
            placeholder="친구 닉네임"
            className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            placeholder="체육 프로그램"
            className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={addFriend}
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          친구 추가
        </button>
      </div>

      {/* 친구 목록 섹션 */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">친구 목록</h2>
        {/* 친구 목록이 길어져서 스크롤이 필요한 경우 */}
        <div className="overflow-x-auto max-w-full">
          {friends.length > 0 ? (
            <ul className="space-y-4">
              {friends.map((friend) => (
                <li
                  key={friend.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
                >
                  <div>
                    <span className="text-lg font-medium text-gray-800">
                      {friend.nickname}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      {friend.program}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* 친구 삭제 버튼 */}
                    <button
                      onClick={() => deleteFriend(friend.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                    >
                      삭제
                    </button>
                    {/* 친구 닉네임 수정 */}
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="새 닉네임"
                      className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={() => updateNickname(friend.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                      수정
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">친구가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
