import React, { useState } from "react";
//import Lecture from "./Lecture";

// 배열안에 들어갈 객체 타입을 지정
// 자식 컴포넌트로 넘겨주기 위해 export
export type LectureType = {
  title: string;
  professor_name: string;
  room: number;
};

const LectureList = (data: any) => {
  const [lectureList, setLectureList] = useState<LectureType[]>([
    {
      title: "프로그래밍 입문",
      professor_name: "이종우",
      room: 1,
    },
    {
      title: "운영체제",
      professor_name: "이종우",
      room: 2,
    },
    {
      title: "서버운영및보안",
      professor_name: "이종우",
      room: 1,
    },
  ]);
  return (
    <div>
      {lectureList &&
        lectureList.map((lecture) => (
          <div>강의 목록 - 마이페이지 적용시 수정 필요</div>
          //<Lecture lecture={lecture}></Lecture>
        ))}
    </div>
  );
};

export default LectureList;
