import React from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import { useNavigate } from "react-router";
import { LectureType } from "../components/LecturePage";

type LectureProps = {
  // 부모 컴포넌트에 import 해온 타입을 재사용
  lecture: LectureType;
};
const Lecture = ({ lecture }: LectureProps) => {
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

    // TODO 서버 나오면 디버깅 필요
    axios
      .post("http://moaroom-back.duckdns.org:8080/lecture/enroll", params)
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
  return (
    <div className="card mb-2 mt-2 rounded">
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
