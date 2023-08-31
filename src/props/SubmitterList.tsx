import React, { useState, useEffect } from "react";
import Submitter from "./Submitter";
import axios from "axios";

// 배열안에 들어갈 객체 타입을 지정
// 자식 컴포넌트로 넘겨주기 위해 export
export type SubmitterPropType = {
  id: string; //student
  name: string;
  step: number; // 0:진행중, 1:진행대기중, 2:채점중, 3:완료
  score: number;
  user_id: string;
  assignment_id: string;
  lecture_id: string;
  isProfessor: boolean;
};
const SubmitterList = ({
  submittersPropsList,
}: {
  submittersPropsList: SubmitterPropType[];
}) => {
  console.log("submittersPropsList:" + submittersPropsList);
  return (
    <div>
      {submittersPropsList &&
        submittersPropsList.map((submittersProps) => (
          <Submitter submittersProps={submittersProps}></Submitter>
        ))}
    </div>
  );
};

export default SubmitterList;
