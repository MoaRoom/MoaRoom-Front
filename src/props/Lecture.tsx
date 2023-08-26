import React from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import { useNavigate } from "react-router";
import { LectureType } from "../components/LecturePage";
import api from "../utils/api";

type LectureProps = {
  // 부모 컴포넌트에 import 해온 타입을 재사용
  lecture: LectureType;
  isProfessor: Boolean;
};
const Lecture = ({ lecture, isProfessor }: LectureProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state.user_id;
  const { lecture_id, title, professor_name, room, enroll } = lecture;
  const Enroll = (data: any) => {
    let params = {
      lecture_id: lecture_id,
      student_id: user_id,
    };
    console.log(params);

    api.client
      .post("/lectures/students/enroll", params)
      .then(function(response) {
        console.log(response)
        if (response.data === "강의 신청 완료") {
          alert("강의 신청이 완료 되었습니다.")
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const moveAssignment = (data:any) => {
    if(enroll == true){
      navigate("/assignmentList", {
        state:{
          user_id: user_id, isProfessor: false, 
          lecture_title: title, professor_name: professor_name, room: room,
          lecture_id: lecture_id
        }
      })
    }
    if(isProfessor == true){
      navigate("/assignmentList", {
        state:{
          user_id: user_id, isProfessor: true, 
          lecture_title: title, professor_name: professor_name, room: room,
          lecture_id: lecture_id
        }
      })
    }
  }
  return (
    <div className="card mb-2 mt-2 rounded" onClick={moveAssignment}>
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
            <button className="btn btn-outline-success text-center shadow-none mb-3" style={{visibility:"hidden",width: "200px", height:"55px"}}>강의 신청 하기</button>
            )}
          {enroll == false && (
            <button className="btn btn-outline-success text-center shadow-none mb-3" style={{width: "200px", height:"55px"}} onClick={Enroll}>강의 신청 하기</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lecture;
