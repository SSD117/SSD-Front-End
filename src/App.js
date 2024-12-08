import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";

import SplashPage from "./pages/Main/SplashPage";
import MainPage from "./pages/Main/MainPage";
import MyPage from "./pages/myPage/MyPage";
import SearchPage from "./pages/Search/SearchPage";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUp1 from "./pages/SignUp_1";
import SignUp2 from "./pages/SignUp_2";
import Splash from "./pages/Splash";
import Detail from "./pages/Detail";
import Question from "./pages/Question";

const Layout = () => (
  <div className="page">
    <Header />
    <div className="wrap">
      <Outlet />
    </div>
    <Navbar />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SplashPage />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/Mypage" element={<MyPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signUp1" element={<SignUp1 />} />
          <Route path="/signUp2" element={<SignUp2 />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/detail/:sport_id" element={<Detail />} />
          <Route path="/question" element={<Question />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
