import React from "react";
import { LectureType } from "./MyPageLectureList";
import "../style/home.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useLocation } from "react-router-dom";
type LectureProps = {
  // 부모 컴포넌트에 import 해온 타입을 재사용
  lecture: LectureType;
};
const MyPageLecture = ({ lecture }: LectureProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lecture_id, title, professor_name, room, enroll } = lecture;
  const user_id = location.state.user_id;
  const isProfessor = location.state.isProfessor;
  const gotoAssignment = (data: any) => {
    if (enroll == true) {
      navigate("/assignmentList", {
        state: {
          user_id: user_id,
          isProfessor: false,
          lecture_title: title,
          professor_name: professor_name,
          room: room,
          lecture_id: lecture_id,
        },
      });
    }
    if (isProfessor == true) {
      navigate("/assignmentList", {
        state: {
          user_id: user_id,
          isProfessor: true,
          lecture_title: title,
          professor_name: professor_name,
          room: room,
          lecture_id: lecture_id,
        },
      });
    }
  };
  return (
    <div className="card mb-2 mt-2 rounded" onClick={gotoAssignment}>
      <div className="card-body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <p className="profile-lecture-text">{title}</p>
          <p className="profile-lecture-text">{professor_name}</p>
          <p className="profile-lecture-text">{room}</p>
          {enroll == true && (
            <button
              className="btn btn-outline-success text-center shadow-none mb-3"
              style={{ visibility: "hidden", width: "200px", height: "55px" }}
            >
              강의 신청 하기
            </button>
          )}
          {enroll == false && (
            <button
              className="btn btn-outline-success text-center shadow-none mb-3"
              style={{ width: "200px", height: "55px" }}
            >
              강의 신청 하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageLecture;
