// Question.jsx
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import api from "../api/api";

const questions = [
  {
    id: 1,
    title: "운동 선호도",
    options: ["운동이 정말 좋아요!", "그냥 가끔 하는 게 좋아요."],
  },
  {
    id: 2,
    title: "운동 강도",
    options: [
      "힘껏 열심히, 땀을 많이 흘리는 게 좋아요!",
      "천천히, 조심히 하는 게 좋아요.",
    ],
  },
  {
    id: 3,
    title: "운동 주당 빈도 (정기성)",
    options: ["매일 꾸준히 하고 싶어요!", "시간이 날 때 가끔만 하고 싶어요."],
  },
  {
    id: 4,
    title: "운동 친구 유무",
    options: ["혼자 집중해서 하는 게 좋아요!", "친구랑 같이 하면 더 재밌어요!"],
  },
  {
    id: 5,
    title: "운동 목표",
    options: [
      "한 가지 목표를 끝까지 잘 해내고 싶어요!",
      "다양한 스킬을 배우고 싶어요!",
    ],
  },
  {
    id: 6,
    title: "운동 방식",
    options: [
      "공을 가지고 하는 운동이 좋아요!",
      "준비물 없이 하는 운동이 좋아요!",
    ],
  },
  {
    id: 7,
    title: "활동성",
    options: [
      "오랫동안 즐기면서 운동하는 게 좋아요!",
      "짧고 재미있게 끝나는 운동이 좋아요!",
    ],
  },
  {
    id: 8,
    title: "실내 vs 실외",
    options: ["실내에서 운동하는 게 좋아요!", "야외에서 뛰어노는 게 좋아요!"],
  },
  {
    id: 9,
    title: "운동 시간대",
    options: ["아침이나 낮에 하는 게 좋아요.", "저녁에 하는 게 좋아요."],
  },
  {
    id: 10,
    title: "운동 종류",
    options: [
      "유산소 운동 (걷기, 달리기, 수영 등)",
      "무산소 운동 (웨이트, 근력 운동 등)",
    ],
  },
];

export default function Question() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0); // Current question index
  const [hasAnswered, setHasAnswered] = useState(false); // Whether the current question is answered
  const swiperRef = useRef(null);

  const handleAnswer = (questionId, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
    setHasAnswered(true); // Mark the current question as answered
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      setHasAnswered(false); // Reset the answered state for the next question
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
      setHasAnswered(true); // Assume the user has already answered previous questions
    }
  };

  const mapping = {
    1: "preference",
    2: "intense",
    3: "frequency",
    4: "friend",
    5: "goal",
    6: "method",
    7: "activity",
    8: "place",
    9: "time",
    10: "type",
  };

  const handleSubmit = async () => {
    try {
      const data = Object.fromEntries(
        Object.entries(answers).map(([key, value]) => [mapping[key], value])
      );
      await api.submitSurvey(data);
      console.log("Submitted answers:", data);
      alert("설문이 제출되었습니다!");
    } catch (err) {
      alert(err);
    }

    navigate("/mainPage");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">AI 설문조사</h1>

      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg relative">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={30}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.activeIndex);
            setHasAnswered(
              answers[questions[swiper.activeIndex].id] !== undefined
            ); // Check if this question has already been answered
          }}
          className="h-96"
        >
          {questions.map((question) => (
            <SwiperSlide
              key={question.id}
              className="flex items-center justify-center"
            >
              <div className="text-center w-full">
                <h2 className="text-xl font-semibold mb-6">{question.title}</h2>
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    className="block w-full bg-blue-500 text-white py-3 px-4 rounded-lg mb-4 hover:bg-blue-600 transition"
                    onClick={() =>
                      handleAnswer(question.id, idx === 0 ? 10 : 5)
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ProgressBar */}
        <div className="my-4">
          <div className="text-sm text-gray-700 text-center mb-2">
            {currentIndex + 1} / {questions.length} 질문
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className={`px-4 py-2 rounded-lg transition ${"bg-blue-500 hover:bg-blue-600 text-white"}`}
            onClick={handlePrev}
          >
            이전
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              className={`px-4 py-2 rounded-lg transition ${
                hasAnswered
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-500 text-white"
              }`}
              onClick={handleSubmit}
              disabled={!hasAnswered} // Disable if not answered
            >
              제출
            </button>
          ) : (
            <button
              className={`px-4 py-2 rounded-lg transition ${
                hasAnswered
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-500 text-white"
              }`}
              onClick={handleNext}
              disabled={!hasAnswered} // Disable if not answered
            >
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
