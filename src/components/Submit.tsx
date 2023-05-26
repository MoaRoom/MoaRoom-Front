import React, { FC, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SubmitterList from "../props/SubmitterList";
import "../style/home.css";
const Submit: FC = () => {
  // nav bar login btn
  const navigate = useNavigate();
  const logout = () => {
    navigate("/", {
      state: {},
    });
  };
  const mypage = () => {
    navigate("/mypage", {
      state: {},
    });
  };

  return (
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
        <div className="card mb-6 mt-3 profile-submitter-box">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "10px",
              paddingLeft: "10px",
            }}
          >
            <p className="">제출자 목록</p>
            <button
              className="btn btn-outline-primary text-center shadow-none mb-3"
              style={{
                width: "100px",
                height: "35px",
                display: "block",
                float: "right",
              }}
              type="submit"
            >
              일괄 채점
            </button>
          </div>
          <SubmitterList />
        </div>
      </div>
    </>
  );
};
export default Submit;
