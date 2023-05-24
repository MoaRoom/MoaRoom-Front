import React from "react";
import { LectureType } from "./LectureList";

type LectureProps = {
  // 부모 컴포넌트에 import 해온 타입을 재사용
  lecture: LectureType;
};
const Lecture = ({ lecture }: LectureProps) => {
  const { title, professor_name, room } = lecture;
  return (
    <div className="card mb-2 mt-2 rounded">
      <div className="card-body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <p className="profile-lecture-text">{title}</p>
          <p className="profile-lecture-text">{professor_name}</p>
          <p className="profile-lecture-text">{room}</p>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
