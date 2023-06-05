import React, { FC } from "react";
import { useNavigate } from "react-router";
import "../style/Navbar.css";
import logo from "../logo/logo-web.png";

export type navPropsType = {
  user_id: string;
  isProfessor: boolean;
};

const Navbar = ({ navProps }: { navProps: navPropsType }) => {
  const { user_id, isProfessor } = navProps;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("isLogin");
    navigate("/home", {
      state: { user_id: user_id, isProfessor: isProfessor },
    });
  };
  const mypage = () => {
    navigate("/mypage", {
      state: { user_id: user_id, isProfessor: isProfessor },
    });
  };
  const login = () => {
    navigate("/login", {
      state: { user_id: user_id, isProfessor: isProfessor },
    });
  };
  if (localStorage.getItem("isLogin") === "True") {
    return (
      <div
        className="navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 50,
        }}
      >
        <div>
          <img className="logo" src={logo} />
        </div>
        <div>
          <button className="navbtn" onClick={logout}>
            로그아웃
          </button>
          <button className="navbtn" onClick={mypage}>
            마이페이지
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <div>
          <h3 className="m-3">Logo</h3>
        </div>
        <div>
          <button type="submit" className="navbtn" onClick={login}>
            로그인
          </button>
        </div>
      </div>
    );
  }
};
export default Navbar;
