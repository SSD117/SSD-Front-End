import React, { useEffect, useState } from "react";
import { faAngleLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Header.scss";
import AppLogo from "../../assets/images/AppLogo.png";

export default function Header() {
  // 상태 변수 선언
  const [isVisible, setIsVisible] = useState(true); // 헤더의 가시성 상태 (스크롤 시 숨기기/보이기)
  const [lastScrollY, setLastScrollY] = useState(0); // 마지막 스크롤 위치
  const [isClicked, setIsClicked] = useState(false); // 뒤로 가기 버튼 클릭 여부

  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  const location = useLocation(); // 현재 경로 정보
  const { nickname } = useParams(); // URL 파라미터에서 nickname 값 추출

  // 뒤로 가기 버튼 클릭 시 이전 페이지로 이동하는 함수
  const goBack = () => {
    navigate(-1);
  };

  const [scrollY, setScrollY] = useState(false); // 스크롤 위치가 50px 이상인지를 체크하는 상태

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setScrollY(true); // 스크롤이 50px 이상일 경우
    } else {
      setScrollY(false); // 스크롤이 50px 미만일 경우
    }
  };

  // 컴포넌트 마운트 시 스크롤 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  // 스크롤 방향에 따라 헤더의 가시성 설정
  useEffect(() => {
    if (scrollY > lastScrollY) {
      setIsVisible(false); // 스크롤이 아래로 내려갔으면 헤더 숨김
    } else {
      setIsVisible(true); // 스크롤이 위로 올라갔으면 헤더 보임
    }
    setLastScrollY(scrollY); // 마지막 스크롤 위치 업데이트
  }, [scrollY]);

  // 특정 경로에서만 뒤로 가기 버튼을 보이도록 설정
  const excludePaths = ["/", "/mainPage", "/page1", "/page2", "/myPage", "/page4"];
  const showBackButton = !excludePaths.includes(location.pathname) && !location.pathname.startsWith("/page4");

  // showBackButton 상태에 따라 isClicked 상태 업데이트
  useEffect(() => {
    if (showBackButton) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [showBackButton]);

  return (
    <div className={`header ${isVisible ? "visible" : "hidden"}`}>
      {/* 뒤로 가기 버튼을 표시할 경로에서만 보여주기 */}
      {showBackButton ? (
        <div className="icon-back">
          <NavLink
            to="#"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={goBack} // 뒤로 가기 버튼 클릭 시 실행될 함수
            style={{
              color: isClicked ? "mediumslateblue" : "white", // 클릭 시 색상 변경
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} /> {/* 왼쪽 화살표 아이콘 */}
            <div className="header-text"> </div> {/* 버튼 텍스트 */}
          </NavLink>
        </div>
      ) : (
        <img 
          src={AppLogo} 
          alt="방과후에 뭐하니?" 
          className="logo" 
          onClick={() => navigate("/mainPage")} // 로고 클릭 시 /mainPage로 이동
          style={{ cursor: "pointer" }} // 클릭 가능한 상태임을 나타내는 스타일 추가
        />
      )}
      <div className="icon-search">
        <NavLink
          to="/search" // 검색 페이지로 이동하는 링크
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} /> {/* 돋보기 아이콘 */}
        </NavLink>
      </div>
    </div>
  );
}
