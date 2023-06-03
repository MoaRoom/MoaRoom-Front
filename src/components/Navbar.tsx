import React, { FC } from "react";
import { useNavigate } from "react-router";
import "../style/Navbar.css";

const Navbar:FC = ():any => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("isLogin");
        navigate("/home", {
            state: {},
          });
      };
      const mypage = () => {
        navigate("/mypage", {
            state: {},
          });
      };
    const login = () => {
        navigate("/login", {
          state: {},
        });
      };
      if(localStorage.getItem("isLogin") === "True"){
        return(
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
                <button className="navbtn" onClick={logout}>
                  로그아웃
                </button>
                <button className="navbtn" onClick={mypage}>
                  마이페이지
                </button>
              </div>
            </div>
        )
      } else{
          return(
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
}
export default Navbar;