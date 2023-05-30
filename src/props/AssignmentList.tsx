import React, { useState } from "react";
import Assignment from "./Assignment";

// 배열안에 들어갈 객체 타입을 지정
// 자식 컴포넌트로 넘겨주기 위해 export
export type AssignmentType = {
  assignment: string;
  step: number; // 0:진행중, 1:진행대기중, 2:채점중, 3:완료
  score: number;
};

const AssignmentList = () => {
  const [submittersList, setSubmitterList] = useState<AssignmentType[]>([
    {
        assignment: "프로그래밍 리포트#1",
      step: 0,
      score: 0,
    },
    {
        assignment: "프로그래밍 리포트#2",
      step: 2,
      score: 0,
    },
    {
        assignment: "프로그래밍 리포트#3",
      step: 3,
      score: 90,
    },
  ]);
  return (
    <div>
      {submittersList.map((submitter) => (
        <Assignment submitter={submitter}></Assignment>
      ))}
    </div>
  );
};

export default AssignmentList;
