import React, { useState } from "react";
import MyPageLecture from "./MyPageLecture";
import "../style/home.css";

// 배열안에 들어갈 객체 타입을 지정
// 자식 컴포넌트로 넘겨주기 위해 export
export type LectureType = {
  lecture_id: string;
  title: string;
  professor_name: string;
  room: number;
  enroll: Boolean;
};

const MyPageLectureList = ({ lectureList }: { lectureList: LectureType[] }) => {
  const filteredLectureList: LectureType[] = [];
  for (let i = 0; i < lectureList.length; i++) {
    if (lectureList[i].enroll == true || lectureList[i].enroll == null) {
      filteredLectureList.push(lectureList[i]);
    }
  }
  return (
    <div>
      {filteredLectureList &&
        filteredLectureList.map((lecture) => (
          <MyPageLecture lecture={lecture}></MyPageLecture>
        ))}
    </div>
  );
};

export default MyPageLectureList;
