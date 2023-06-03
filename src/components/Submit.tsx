import React, { FC } from "react";
import SubmitterList from "../props/SubmitterList";
import "../style/home.css";
import Navbar from "./Navbar";
const Submit: FC = () => {
  return (
    <>
      <div className="background">
        <Navbar />
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
