import React from "react";
import { SubmitterPropType } from "./SubmitterList";
import "../style/home.css";
import { useNavigate } from "react-router-dom";

type submittersPropsList = {
  // 부모 컴포넌트에 import 해온 타입을 재사용
  submittersProps: SubmitterPropType;
};

const Submitter = ({ submittersProps }: submittersPropsList) => {
  const {
    id,
    name,
    step,
    score,
    user_id,
    assignment_id,
    isProfessor,
  } = submittersProps;
  console.log("submittersProps:" + submittersProps);
  const navigate = useNavigate();
  const goScore = () => {
    navigate("/score", {
      state: {
        student_id: id, // student
        professor_id: user_id, // professor
        assignment_id: assignment_id,
        isProfessor: isProfessor,
      },
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
          <p className="profile-lecture-text">{name}</p>
          {/* 채점 완료인 경우 */}
          {step == 3 && (
            <button
              onClick={() => goScore()}
              className="btn btn-outline-success text-center shadow-none mb-3 submit-btn"
            >
              채점 완료: {score}점/100점
            </button>
          )}
          {/* 그 외 */}
          {isProfessor && step != 3 && (
            <button
              onClick={() => goScore()}
              className="btn btn-outline-danger text-center shadow-none mb-3 submit-btn"
            >
              채점하기
            </button>
          )}
          {!isProfessor && step != 3 && (
            <button
              onClick={() => goScore()}
              className="btn btn-outline-danger text-center shadow-none mb-3 submit-btn"
            >
              채점중
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Submitter;
