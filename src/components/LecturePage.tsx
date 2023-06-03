import React, { FC, useEffect } from "react";
import {useLocation} from "react-router-dom";
import "../style/LecturePage.css";
import axios from "axios";
import LectureList from "../props/LectureList";
import Paging from "../components/Paging";
import Navbar from "./Navbar";

const LecturePage: FC = () => {
    const location = useLocation();
    const user_id = location.state.user_id;
      useEffect(() => {
        axios
          .get("http://localhost:8080/lecture/all")
          .then((response) => {
            console.log(response.data)
          });
      }, []);
    return(
        <>
          <div className="background">
            <Navbar />
            <div className="search">
              <input id="searchtext" type="text"></input>
              <button>
                <img id="searchbtn" src="https://e7.pngegg.com/pngimages/446/413/png-clipart-computer-icons-button-search-box-button-window-rim.png"></img>
              </button>
            </div>
            <div className="lecture-list">
              <div className="listheader"
                  style={{
                  display: "flex",
                  justifyContent: "space-around",
                  paddingRight: "190px"
              }}>
                  <p className="lecture-text">강의명</p>
                  <p className="lecture-text">담당교수</p>
                  <p className="lecture-text">분반</p>
              </div>
              <LectureList/>
              <Paging />
            </div>
          </div>
        </>
    )
}

export default LecturePage;