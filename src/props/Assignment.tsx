import React from "react";
import { AssignmentPropType } from "../components/AssignmentPage";
import { useNavigate } from "react-router-dom";
import "../style/AssignmentPage.css";

type AssignmentProps = {
  // 부모 컴포넌트에 import 해온 타입을 재사용
  assignment: AssignmentPropType;
};

const Assignment = ({ assignment }: AssignmentProps) => {
  const {
    lecture_id,
    assignment_id,
    title,
    step,
    score,
    user_id,
    isProfessor,
  } = assignment;
  const navigate = useNavigate();
  const goScore = () => {
    console.log("navigate with" + user_id + assignment_id + isProfessor);
    navigate("/submit", {
      state: {
        user_id: user_id,
        assignment_id: assignment_id,
        lecture_id: lecture_id,
        isProfessor: isProfessor,
      },
    });
  };
  const goAssignment = () => {
    console.log("navigate with" + user_id + assignment_id + isProfessor);
    navigate("/assignment", {
      state: {
        user_id: user_id,
        assignment_id: assignment_id,
        lecture_id: lecture_id,
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
          <p className="lecture-text">{title}</p>
          {/* 채점 완료인 경우 - 교수 */}
          {step == 3 && score == null && (
            <button
              onClick={() => goScore()}
              className="btn btn-outline-primary text-center shadow-none mb-3 submit-btn"
            >
              완료
            </button>
          )}
          {/* 채점 완료인 경우 - 학생 */}
          {step == 3 && score != null && (
            <button
              onClick={() => goAssignment()}
              className="btn btn-outline-primary text-center shadow-none mb-3 submit-btn"
            >
              채점 완료: {score}점/100점
            </button>
          )}
          {/* 진행중 - 학생 */}
          {step == 0 && isProfessor == false &&(
            <button
              onClick={() => goAssignment()}
              className="btn btn-outline-success text-center shadow-none mb-3 submit-btn"
            >
              진행중
            </button>
          )}
          {/* 진행중 - 교수 */}
          {step == 0 && isProfessor == true &&(
            <button
              onClick={() => goScore()}
              className="btn btn-outline-success text-center shadow-none mb-3 submit-btn"
            >
              진행중
            </button>
          )}
          {/* 채점중 - 교수 */}
          {step == 2 && isProfessor == true &&(
            <button
              onClick={() => goScore()}
              className="btn btn-outline-warning text-center shadow-none mb-3 submit-btn"
            >
              채점중
            </button>
          )}
          {/* 채점중 - 학생 */}
          {step == 2 && isProfessor == false && (
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
