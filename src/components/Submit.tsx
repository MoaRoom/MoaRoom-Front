import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import SubmitterList from "../props/SubmitterList";
import "../style/home.css";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { SubmitterPropType } from "../props/SubmitterList";
const Submit: FC = () => {
  // SubmitterList

  // 제출 페이지와 연동
  const location = useLocation();
  const user_id = location.state.user_id; // professor
  const assignment_id = location.state.assignment_id;
  const isProfessor = location.state.isProfessor;
  // TODO: lecture_id도 필요함!(res가 list로 변경될 경우)

  const [submittersPropsList, setSubmittersPropsList] = useState<
    SubmitterPropType[]
  >([]);

  var tmpList: SubmitterPropType[] = [];
  useEffect(() => {
    axios
      .get("http://moaroom-back.duckdns.org:8080/step/" + assignment_id)
      .then((response) => {
        if (isProfessor) {
          for (let i = 0; i < response.data.length; i++) {
            tmpList.push({
              id: response.data[i].id,
              name: response.data[i].name,
              step: response.data[i].step,
              score: response.data[i].score,
              user_id: user_id,
              assignment_id: assignment_id,
              isProfessor: isProfessor,
            } as SubmitterPropType);
          }
          setSubmittersPropsList(tmpList);
        } else {
          // 학생 것만 보이게
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].id == user_id) {
              tmpList.push({
                id: response.data[i].id,
                name: response.data[i].name,
                step: response.data[i].step,
                score: response.data[i].score,
                user_id: user_id,
                assignment_id: assignment_id,
                isProfessor: isProfessor,
              } as SubmitterPropType);
            }
          }
          setSubmittersPropsList(tmpList);
        }
      });
  }, []);

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
          <SubmitterList submittersPropsList={submittersPropsList} />
        </div>
      </div>
    </>
  );
};
export default Submit;
