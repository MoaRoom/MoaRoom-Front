import React, { useState } from "react";
import Submitter from "./Submitter";

// 배열안에 들어갈 객체 타입을 지정
// 자식 컴포넌트로 넘겨주기 위해 export
export type SubmitterType = {
  user_name: string;
  step: number; // 0:진행중, 1:진행대기중, 2:채점중, 3:완료
  score: number;
};

const SubmitterList = () => {
  const [submittersList, setSubmitterList] = useState<SubmitterType[]>([
    {
      user_name: "금나연",
      step: 0,
      score: 0,
    },
    {
      user_name: "김민지",
      step: 1,
      score: 0,
    },
    {
      user_name: "이00",
      step: 2,
      score: 0,
    },
    {
      user_name: "박00",
      step: 3,
      score: 80,
    },
    {
      user_name: "나00",
      step: 3,
      score: 100,
    },
  ]);
  return (
    <div>
      {submittersList.map((submitter) => (
        <Submitter submitter={submitter}></Submitter>
      ))}
    </div>
  );
};

export default SubmitterList;
