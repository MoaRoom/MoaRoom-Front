import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LecturePage.css";
import LectureList from "../props/LectureList";
import Paging from "../components/Paging";

const LecturePage: FC = () => {
    const navigate = useNavigate();
    const logout = () => {
        navigate("/home", {
            state: {},
          });
      };
      const mypage = () => {
        navigate("/mypage", {
            state: {},
          });
      };
    return(
        <>
            <div className="background">
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
              {/* search form */}
              <form className="search">
                <input id="searchtext" type="text"></input>
                <button>
                  <img id="searchbtn" src="https://e7.pngegg.com/pngimages/446/413/png-clipart-computer-icons-button-search-box-button-window-rim.png"></img>
                </button>
              </form>
            <div className="lecture-list">
            <div className="listheader"
                style={{
                display: "flex",
                justifyContent: "space-around",
            }}>
                <p className="lecture-text">강의명</p>
                <p className="lecture-text">담당교수</p>
                <p className="lecture-text">분반</p>
            </div>
            <LectureList/>
            <div className="card mb-2 mt-2 rounded">
            <div className="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <p className="profile-lecture-text">서버운영및보안</p>
                <p className="profile-lecture-text">이종우</p>
                <p className="profile-lecture-text">1</p>
                <p 
                  style={{
                    position: "fixed",
                    right:"15px"
                  }}
                className="btn btn-outline-success text-center shadow-none mb-3">강의 신청 하기</p>
              </div>
            </div>
          </div>
            <Paging />
            </div>
            </div>
        </>
    )
}

export default LecturePage;