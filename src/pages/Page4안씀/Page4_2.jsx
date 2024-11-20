import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Page4_2.css';

const Page4_2 = () => {
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault(); // 폼 제출 방지
    navigate("/mainPage");
  };


  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    school: '',
    height: '',
    weight: '',
    bodyFat: '',
    experience: '',
    healthIssues: '',
    limitations: '',
    preferredExerciseType: '',
    preferredIntensity: '',
    preferredTime: '',
    preferredLocation: '',
    goals: '',
    activities: '',
    voucher: '',
    additionalRequests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2>회원 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>기본 정보</h3>
          <div className="form-group">
            <label>이름:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>나이:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>성별:</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>학교:</label>
            <input type="text" name="school" value={formData.school} onChange={handleChange} />
          </div>
        </div>

        {/* 신체 정보 */}
        <div className="section">
          <h3>신체 정보</h3>
          <div className="form-group">
            <label>키 (cm):</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>몸무게 (kg):</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>체지방률 (%) (선택 사항):</label>
            <input type="number" name="bodyFat" value={formData.bodyFat} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>운동 경험 유무:</label>
            <select name="experience" value={formData.experience} onChange={handleChange}>
              <option value="">선택</option>
              <option value="있음">있음</option>
              <option value="없음">없음</option>
            </select>
          </div>
        </div>

        {/* 건강 상태 */}
        <div className="section">
          <h3>건강 상태</h3>
          <div className="form-group">
            <label>특이 건강 사항 (선택 사항):</label>
            <input type="text" name="healthIssues" value={formData.healthIssues} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>운동 제한 사항 (선택 사항):</label>
            <input type="text" name="limitations" value={formData.limitations} onChange={handleChange} />
          </div>
        </div>

        {/* 운동 성향 정보 */}
        <div className="section">
          <h3>운동 성향 정보</h3>
          <div className="form-group">
            <label>선호하는 운동 종류:</label>
            <input type="text" name="preferredExerciseType" value={formData.preferredExerciseType} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>선호 운동 강도:</label>
            <input type="text" name="preferredIntensity" value={formData.preferredIntensity} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>운동 시간대 선호도:</label>
            <input type="text" name="preferredTime" value={formData.preferredTime} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>운동 장소 선호도:</label>
            <input type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} />
          </div>
        </div>

        {/* 목표 및 관심사 */}
        <div className="section">
          <h3>목표 및 관심사</h3>
          <div className="form-group">
            <label>운동 목표:</label>
            <input type="text" name="goals" value={formData.goals} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>관심 있는 활동:</label>
            <input type="text" name="activities" value={formData.activities} onChange={handleChange} />
          </div>
        </div>

        {/* 기타 사항 */}
        <div className="section">
          <h3>기타 사항</h3>
          <div className="form-group">
            <label>스포츠 강좌 이용권 보유 여부:</label>
            <select name="voucher" value={formData.voucher} onChange={handleChange}>
              <option value="">선택</option>
              <option value="있음">있음</option>
              <option value="없음">없음</option>
            </select>
          </div>
          <div className="form-group">
            <label>추가 요구 사항 (선택 사항):</label>
            <input type="text" name="additionalRequests" value={formData.additionalRequests} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" onClick={handleSignupClick} >제출</button>
      </form>
    </div>
  );
};

export default Page4_2;
