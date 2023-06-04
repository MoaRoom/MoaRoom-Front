import React from "react";
import { AssignmentType } from "../components/AssignmentPage";
import { useNavigate } from "react-router-dom";
import "../style/AssignmentPage.css";

type AssignmentProps = {
  // 부모 컴포넌트에 import 해온 타입을 재사용
  assignment: AssignmentType;
};

const Assignment = ({ assignment }: AssignmentProps) => {
  const { lecture_id, assignment_id, title, step, score } = assignment;
  return (
    <div className="card mb-2 mt-2 rounded">
      <div className="card-body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p className="lecture-text">{title}</p>
          {/* 채점 완료인 경우 - 교수 */}
          {(step == 3 && score == null) && (
            <button
              className="btn btn-outline-primary text-center shadow-none mb-3 submit-btn"
            >
              완료
            </button>
          )}
          {/* 채점 완료인 경우 - 학생 */}
          {(step == 3 && score != null) && (
            <button
              className="btn btn-outline-primary text-center shadow-none mb-3 submit-btn"
            >
              채점 완료: {score}점/100점
            </button>
          )}
          {/* 진행중 */}
          {step == 0 && (
            <button
              className="btn btn-outline-success text-center shadow-none mb-3 submit-btn"
            >
              진행중
            </button>
          )}
        {/* 채점중 */}
        {step == 2 && (
            <button
              className="btn btn-outline-warning text-center shadow-none mb-3 submit-btn"
            >
              채점중
            </button>
          )}
        {/* 진행 대기중 */}
        {step == 1 && (
            <button
              className="btn btn-outline-warning text-center shadow-none mb-3 submit-btn"
            >
              진행 대기중
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment;
