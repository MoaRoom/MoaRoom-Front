import React from "react";
import { SubmitterType } from "./SubmitterList";
import "../style/home.css";
import { useNavigate } from "react-router-dom";

type SubmitterProps = {
  // 부모 컴포넌트에 import 해온 타입을 재사용
  submitter: SubmitterType;
};

const Submitter = ({ submitter }: SubmitterProps) => {
  const { user_name, step, score } = submitter;
  const navigate = useNavigate();
  const goScore = (user_name: string) => {
    navigate("/score", {
      state: { user_name: user_name }, // TODO name 말고 정보들,,
    });
  };
  return (
    <div className="card mb-2 mt-2 rounded">
      <div className="card-body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p className="profile-lecture-text">{user_name}</p>
          {/* 채점 완료인 경우 */}
          {step == 3 && (
            <button
              onClick={() => goScore(user_name)}
              className="btn btn-outline-success text-center shadow-none mb-3 submit-btn"
            >
              채점 완료: {score}점/100점
            </button>
          )}
          {/* 그 외 */}
          {step != 3 && (
            <button
              onClick={() => goScore(user_name)}
              className="btn btn-outline-danger text-center shadow-none mb-3 submit-btn"
            >
              채점하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Submitter;
