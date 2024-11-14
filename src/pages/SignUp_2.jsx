import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp_2 = () => {
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/mainPage");
  };

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    experience: '',
    interests: [],
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestToggle = (interest) => {
    setFormData((prevData) => {
      const interests = prevData.interests.includes(interest)
        ? prevData.interests.filter((item) => item !== interest)
        : [...prevData.interests, interest];
      return { ...prevData, interests };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">신체 정보 입력</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 신체 정보 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-main01 border-b-2 border-main01 pb-1">신체 정보</h3>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600">키 (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={(e) => handleChange('height', e.target.value)} className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:border-main01" />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600">몸무게 (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={(e) => handleChange('weight', e.target.value)} className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:border-main01" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600">운동 경험 유무</label>
            <div className="flex space-x-4">
              <button type="button" onClick={() => handleChange('experience', '있음')} className={`flex-1 p-3 mb-2 rounded ${formData.experience === '있음' ? 'bg-main01 text-white' : 'bg-gray-200'}`}>있음</button>
              <button type="button" onClick={() => handleChange('experience', '없음')} className={`flex-1 p-3 mb-2 rounded ${formData.experience === '없음' ? 'bg-main01 text-white' : 'bg-gray-200'}`}>없음</button>
            </div>
          </div>

          {/* 관심사 */}
          <div>
            <label className="block text-sm text-gray-600">관심사</label>
            <div className="flex flex-wrap gap-2">
              {['수영', '축구', '배드민턴', '탁구', '농구', '스케이트', '테니스', '기타'].map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 mb-2 rounded ${formData.interests.includes(interest) ? 'bg-main01 text-white' : 'bg-gray-200'}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <button type="submit" onClick={handleSignupClick} className="w-full p-3 text-white bg-main01 rounded cursor-pointer ">
          완료
        </button>
      </form>
    </div>
  );
};

export default SignUp_2;
