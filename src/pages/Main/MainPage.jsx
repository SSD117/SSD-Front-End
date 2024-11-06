import React from "react";
import "./MainPage.css";

export default function MainPage() {
  return (
    <div className="main-page">
      <header className="welcome-message">
        <h1>방과후에 뭐하니?</h1>
        <p>청소년을 위한 체육 활동 추천 시스템에 오신 것을 환영합니다!</p>
      </header>
      
      <div className="card-container">
        <section className="recommendation-card">
          <h2>오늘의 추천 운동</h2>
          <p>간단한 스트레칭과 요가를 추천합니다!</p>
        </section>
        
        <section className="recommendation-card">
          <h2>내일의 추천 운동</h2>
          <p>30분 조깅으로 상쾌하게 시작해보세요!</p>
        </section>
        
        <section className="benefit-info">
          <h2>스포츠 강좌 혜택 안내</h2>
          <p>청소년 스포츠 강좌 이용권으로 다양한 혜택을 누리세요.</p>
        </section>
      </div>
      
      <div className="action-buttons">
        <button className="history-button">활동 기록 확인</button>
        <button className="stats-button">통계 및 성과 확인</button>
      </div>
    </div>
  );
}
