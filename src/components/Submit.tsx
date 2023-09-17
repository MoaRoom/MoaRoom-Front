import React, { FC, useState, useEffect } from "react";
import SubmitterList from "../props/SubmitterList";
import "../style/home.css";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { SubmitterPropType } from "../props/SubmitterList";
import api from "../utils/api";
import axios from "axios";
const Submit: FC = () => {
  // SubmitterList

  // 제출 페이지와 연동
  const location = useLocation();
  const user_id = location.state.user_id; // professor
  const lecture_id = location.state.lecture_id;
  const assignment_id = location.state.assignment_id;
  const isProfessor = location.state.isProfessor;
  // TODO: lecture_id도 필요함!(res가 list로 변경될 경우)

  const [submittersPropsList, setSubmittersPropsList] = useState<
    SubmitterPropType[]
  >([]);
  // const [apiEP, setApiEP] = useState<string>("");

  var tmpList: SubmitterPropType[] = [];
  useEffect(() => {
    api.client.get("/steps/" + assignment_id).then((response) => {
      if (isProfessor) {
        console.log(response.data)
        //기존 코드로 인해 list에 값이 중복으로 들어가게 되므로 삭제
        for (let i = 0; i < response.data.length; i++) {
          tmpList.push({
            id: response.data[i].id,
            name: response.data[i].name,
            step: response.data[i].step,
            score: response.data[i].score,
            user_id: user_id,
            assignment_id: assignment_id,
            lecture_id: lecture_id,
            isProfessor: isProfessor,
          } as SubmitterPropType);
          console.log(tmpList)
        }
        setSubmittersPropsList(tmpList);
        //setSubmittersPropsList(response.data)
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
        console.log(submittersPropsList)
      }
    });
  }, []);

  const autoScore = () => {
    console.log(submittersPropsList)
    // user_id is professor
    console.log("/users/" + user_id + "/urls");
    api.client.get("/users/" + user_id + "/urls").then((response) => {
      // professor has multiple url models but only on apiEnpoint
      response.data.map((urlmodel: any) => {
        const apiEP = urlmodel.apiEndpoint;
        for (let i = 0; i < submittersPropsList.length; i++) {
          axios
            .get(
              apiEP +
                "/assignment/?id=" +
                submittersPropsList[i].id +
                "&assignment_id=" +
                assignment_id
            )
            .then((response) => {
              console.log(response)
              var answer = JSON.parse(response.data).answer;
              var runtime = JSON.parse(response.data).runtime;
              let params = {
                user_id: submittersPropsList[i].id,
                answer: answer.slice(0, -1), // infra comes with /n
                runtime: 1.0,
              };
              console.log(params);
              api.client
                .post("/assignments/" + assignment_id + "/auto", params)
                .then(() => {
                  console.log("자동채점 api 호출");
                  // window.location.reload();
                });
            });
          }
        });
      });
      // 채점 종료 진행상황 반영
      api.client
          .get("steps/assignments/"+assignment_id+"/professor/"+user_id)
          .then((response)=>{
            console.log(response.data)
          })
      
    };

  return (
    <>
      <div className="background">
        <Navbar navProps={{ user_id: user_id, isProfessor: isProfessor }} />
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
              onClick={autoScore}
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
