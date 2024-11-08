// page4_2.jsx
import React, { useState } from "react";

export default function Page4_2() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    school: "",
    height: "",
    weight: "",
    bodyFat: "",
    exerciseExperience: "",
    healthConditions: "",
    exerciseLimitations: "",
    preferredExerciseType: "",
    preferredIntensity: "",
    preferredTime: "",
    preferredLocation: "",
    exerciseGoal: "",
    interestActivities: "",
    hasSportsVoucher: "",
    additionalRequirements: "",
    teamOrSolo: "",
    frequency: "",
    intensity: "",
    goalType: "",
    timeOfDay: "",
    environment: "",
    motivation: "",
    routinePreference: "",
    companion: "",
    shortOrLongGoal: "",
    planType: "",
    recoveryPreference: "",
    exerciseType: "",
    musicPreference: "",
    concentration: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // 제출된 데이터를 처리하는 로직
  };

  return (
    <div>
      <h2>회원 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <h3>기본 정보</h3>
        <label>이름: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
        <label>나이: <input type="number" name="age" value={formData.age} onChange={handleChange} /></label>
        <label>성별: <input type="text" name="gender" value={formData.gender} onChange={handleChange} /></label>
        <label>학교: <input type="text" name="school" value={formData.school} onChange={handleChange} /></label>

        <h3>신체 정보</h3>
        <label>키 (cm): <input type="number" name="height" value={formData.height} onChange={handleChange} /></label>
        <label>몸무게 (kg): <input type="number" name="weight" value={formData.weight} onChange={handleChange} /></label>
        <label>체지방률 (%): <input type="number" name="bodyFat" value={formData.bodyFat} onChange={handleChange} /></label>
        <label>운동 경험: 
          <select name="exerciseExperience" value={formData.exerciseExperience} onChange={handleChange}>
            <option value="">선택</option>
            <option value="있음">있음</option>
            <option value="없음">없음</option>
          </select>
        </label>

        <h3>건강 상태</h3>
        <label>특이 건강 사항: <input type="text" name="healthConditions" value={formData.healthConditions} onChange={handleChange} /></label>
        <label>운동 제한 사항: <input type="text" name="exerciseLimitations" value={formData.exerciseLimitations} onChange={handleChange} /></label>

        <h3>운동 성향 정보</h3>
        <label>선호 운동 종류: <input type="text" name="preferredExerciseType" value={formData.preferredExerciseType} onChange={handleChange} /></label>
        <label>선호 운동 강도: <input type="text" name="preferredIntensity" value={formData.preferredIntensity} onChange={handleChange} /></label>
        <label>운동 시간대 선호도: <input type="text" name="preferredTime" value={formData.preferredTime} onChange={handleChange} /></label>
        <label>운동 장소 선호도: <input type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} /></label>

        <h3>목표 및 관심사</h3>
        <label>운동 목표: <input type="text" name="exerciseGoal" value={formData.exerciseGoal} onChange={handleChange} /></label>
        <label>관심 있는 활동: <input type="text" name="interestActivities" value={formData.interestActivities} onChange={handleChange} /></label>
        <label>스포츠 강좌 이용권 보유 여부: 
          <select name="hasSportsVoucher" value={formData.hasSportsVoucher} onChange={handleChange}>
            <option value="">선택</option>
            <option value="있음">있음</option>
            <option value="없음">없음</option>
          </select>
        </label>
        <label>추가 요구 사항: <input type="text" name="additionalRequirements" value={formData.additionalRequirements} onChange={handleChange} /></label>

        {/* 기타 사항 */}
        {/* 필요한 추가 사항 필드를 나열합니다 */}
        
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
