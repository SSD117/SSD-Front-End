import {
  faCamera,
  faCircleUser,
  faFaceGrinHearts,
  faHouse,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
  const location = useLocation();

  const allowedPaths = ["/mainPage", "/page1", "/page2", "/page3", "/page4"];

  // 현재 경로가 allowedPaths에 포함되지 않으면 null 반환
  if (!allowedPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="nav_bar">
      <div>
        <NavLink
          to="/mainPage"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FontAwesomeIcon icon={faHouse} />
        </NavLink>
      </div>

      <div>
        <NavLink
          to="/page1"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FontAwesomeIcon icon={faCamera} />
        </NavLink>
      </div>

      <div>
        <NavLink
          to="/page2"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FontAwesomeIcon icon={faUsers} />
        </NavLink>
      </div>

      <div>
        <NavLink
          to="/page3"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FontAwesomeIcon icon={faFaceGrinHearts} />
        </NavLink>
      </div>

      <div>
        <NavLink
          to="/page4"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FontAwesomeIcon icon={faCircleUser} />
        </NavLink>
      </div>
    </div>
  );
}
