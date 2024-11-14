import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp_1 = () => {
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/signUp2");
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    school: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 ">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">회원 정보 입력</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 기본 정보 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-main01 border-b-2 border-main01 pb-1">기본 정보</h3>
          
          <div>
            <label className="block text-sm text-gray-600">이름</label>
            <input type="text" name="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:border-main01" />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600">전화번호</label>
            <input type="text" name="phone" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:border-main01" />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600">나이</label>
            <input type="number" name="age" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:border-main01" />
          </div>
          
          <div>
            <label className="block text-sm  text-gray-600">성별</label>
            <div className="flex space-x-4">
              <button type="button" onClick={() => handleChange('gender', '남자')} className={`flex-1 p-3 mb-2 rounded ${formData.gender === '남자' ? 'bg-main01 text-white' : 'bg-gray-200'}`}>남자</button>
              <button type="button" onClick={() => handleChange('gender', '여자')} className={`flex-1 p-3 mb-2 rounded ${formData.gender === '여자' ? 'bg-main01 text-white' : 'bg-gray-200'}`}>여자</button>
              <button type="button" onClick={() => handleChange('gender', '기타')} className={`flex-1 p-3 mb-2 rounded ${formData.gender === '기타' ? 'bg-main01 text-white' : 'bg-gray-200'}`}>기타</button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600">학교</label>
            <input type="text" name="school" value={formData.school} onChange={(e) => handleChange('school', e.target.value)} className="w-full p-3 mb-2 border border-gray-300 rounded  focus:outline-none focus:border-main01" />
          </div>
        </div>
        
        <button type="submit" onClick={handleSignupClick} className="w-full p-3 text-white bg-main01 rounded cursor-pointer">
          다음
        </button>
      </form>
    </div>
  );
};

export default SignUp_1;
