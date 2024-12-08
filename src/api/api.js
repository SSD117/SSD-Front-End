import axios from "axios";

// const BASE_URL = "http://158.180.80.145:3001"; // 백엔드 URL
const BASE_URL = "http://localhost:3001"; // 백엔드 URL

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000,
  withCredentials: true, // 쿠키를 포함한 요청을 보낼 수 있도록 설정
});

const api = {
  // Auth API
  login: (email, password) =>
    apiClient.get("/auth/login", { params: { email, password } }),
  register: (userData) => apiClient.post("/auth/register", userData),
  logout: () => apiClient.get("/auth/logout"),

  // User API
  getUser: () => apiClient.get("/user"),
  updateUser: (data) => apiClient.patch("/user", data),
  deleteUser: () => apiClient.delete("/user"),

  // Sport API
  getSports: () => apiClient.get("/sport"),
  getSportDetail: (sportId) => apiClient.get(`/sport/detail/${sportId}`),
  getAIRecommendation: () => apiClient.get("/sport/ai"),
  submitSurvey: (surveyData) => apiClient.post("/sport/ai", surveyData),
  getSportByAIRecommend: (exercise) =>
    apiClient.get("/sport", { params: { exercise } }),

  // Class API
  getMyClasses: () => apiClient.get("/class"),
  registerClass: (classId) =>
    apiClient.post(`/class`, { params: { class_id: classId } }),
  cancelClass: (classId) =>
    apiClient.delete(`/class`, { params: { class_id: classId } }),

  // Bookmark API
  getMyBookmark: () => apiClient.get("/class/bookmark"),
  registerBookmark: (classId) =>
    apiClient.post(`/class/bookmark`, { params: { class_id: classId } }),
  cancelBookmark: (classId) =>
    apiClient.delete(`/class/bookmark`, { params: { class_id: classId } }),
};

export default api;
