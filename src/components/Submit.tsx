import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import SubmitterList from "../props/SubmitterList";
import "../style/home.css";
import Navbar from "./Navbar";
const Submit: FC = () => {
  // data interface(now deprecated) TODO: apply
  interface UrlResp {
    id: string;
    lectureId: string;
    containerAddress: string;
    apiEndpoint: string;
  }

  // 제출 페이지와 연동
  // const location = useLocation();
  // const assignment_id = location.state.assignment_id;
  const assignment_id = "f58b21b6-0a6e-4cad-a563-77d370ef067e";

  const [data, setData] = useState<UrlResp[]>([]);

  useEffect(() => {
    axios
      .get(
        "http://moaroom-back.duckdns.org:8080/assignment/list/" + assignment_id
      )
      .then((response) => {
        setData(response.data);
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
          {data.map((user) => (
            <SubmitterList user={user} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Submit;
