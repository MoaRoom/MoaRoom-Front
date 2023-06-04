import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/LecturePage.css";
import axios from "axios";
import Lecture from "../props/Lecture";
import Paging from "../components/Paging";
import Navbar from "./Navbar";
import { navPropsType } from "./Navbar";

export type LectureType = {
  lecture_id: string;
  title: string;
  professor_name: string;
  room: number;
  enroll: Boolean | null;
};

const LecturePage: FC = () => {
  const location = useLocation();
  const user_id = location.state.user_id;
  const [lectureList, setLectureList] = useState<LectureType[]>([]);
  const [isProfessor, setIsProfessor] = useState<Boolean>(true);
  useEffect(() => {
    axios
      .get("http://moaroom-back.duckdns.org:8080/lecture/all/" + user_id)
      .then((response) => {
        console.log(response.data);
        setLectureList(response.data);
        if (response.data.length != 0 && response.data[0].enroll != null) {
          setIsProfessor(false);
        }
      });
  }, [isProfessor]);
  return (
    <>
      <div className="background">
        <Navbar
          navProps={
            { user_id: user_id, isProfessor: isProfessor } as navPropsType
          }
        />
        <div className="search">
          <input id="searchtext" type="text"></input>
          <button>
            <img
              id="searchbtn"
              src="https://e7.pngegg.com/pngimages/446/413/png-clipart-computer-icons-button-search-box-button-window-rim.png"
            ></img>
          </button>
        </div>
        <div className="lecture-list">
          <div
            className="listheader"
            style={
              isProfessor
                ? {
                    display: "flex",
                    justifyContent: "space-around",
                  }
                : {
                    display: "flex",
                    justifyContent: "space-around",
                    paddingRight: "190px",
                  }
            }
          >
            <p className="lecture-text">강의명</p>
            <p className="lecture-text">담당교수</p>
            <p className="lecture-text">분반</p>
          </div>
          {lectureList &&
            lectureList.map((lecture) => (
              <Lecture lecture={lecture} isProfessor={isProfessor}></Lecture>
            ))}
          <Paging />
        </div>
      </div>
    </>
  );
};

export default LecturePage;
