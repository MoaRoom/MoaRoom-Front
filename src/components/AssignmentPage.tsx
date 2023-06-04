import React, { FC, useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../style/LecturePage.css";
import Paging from "../components/Paging";
import Assignment from "../props/Assignment";
import AssignmentModal from "../props/AssignmentModal";
import Navbar from "./Navbar";
import { navPropsType } from "./Navbar";

export type AssignmentType = {
  lecture_id: string;
  assignment_id: string;
  title: string;
  step: number; // 0:진행중, 1:진행대기중, 2:채점중, 3:완료
  score: number;
};
export type AssignmentPropType = {
  user_id: string;
  isProfessor: boolean;
  lecture_id: string;
  assignment_id: string;
  title: string;
  step: number; // 0:진행중, 1:진행대기중, 2:채점중, 3:완료
  score: number;
};

const AssignmentPage: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state.user_id;
  const isProfessor = location.state.isProfessor;
  const lecture_id = location.state.lecture_id;
  const [assignmentList, setAssignmentList] = useState<AssignmentType[]>([]);
  const [assignmentPropsList, setAssignmentPropsList] = useState<
    AssignmentPropType[]
  >([]);

  // delete modal
  const [isdeleteModalOpen, setdeleteModalOpen] = useState<boolean>(false);

  const onClickToggledeleteModal = useCallback(() => {
    setdeleteModalOpen(!isdeleteModalOpen);
  }, [isdeleteModalOpen]);
  const newAssignment = () => {
    navigate("/newassignment", {
      state: { user_id: user_id, lecture_id: lecture_id },
    });
  };
  const deleteAssignment = (data: any) => {
    const title = data.title;
    axios
      .delete("http://moaroom-back.duckdns.org:8080/assignment/" + title)
      .then(function(response) {
        if (response.data == "삭제 성공") {
          alert("과제가 삭제되었습니다.");
        } else {
          alert(
            "과제가 삭제되지 않았습니다. 과제명을 올바르게 입력했는지 확인해주세요."
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    var tmpList: AssignmentPropType[] = [];
    axios
      .get("http://moaroom-back.duckdns.org:8080/assignment/all/" + user_id)
      .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            tmpList.push({
              user_id: user_id,
              isProfessor: isProfessor,
              lecture_id: response.data[i].lecture_id,
              assignment_id: response.data[i].assignment_id,
              title: response.data[i].title,
              step: response.data[i].step,
              score: response.data[i].score,
            } as AssignmentPropType);
          }
          setAssignmentPropsList(tmpList);
      });
  }, []);

  return (
    <>
      <div className="background">
        <Navbar
          navProps={
            { user_id: user_id, isProfessor: isProfessor } as navPropsType
          }
        />
        {isdeleteModalOpen && (
          <AssignmentModal onClickToggleModal={onClickToggledeleteModal}>
            <form autoComplete="off" onSubmit={handleSubmit(deleteAssignment)}>
              <div className="mt-3 mb-3">
                <label className="form-label">과제명</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="exampleFormControlInput3"
                  {...register("title", {
                    required: "title is required!",
                  })}
                />
                {errors.title && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    errors.title.message
                  </p>
                )}
              </div>
              <div className="mt-4 mb-3 text-center ">
                <button
                  className="btn btn-outline-danger text-center shadow-none mb-3"
                  type="submit"
                >
                  과제 삭제
                </button>
              </div>
            </form>
          </AssignmentModal>
        )}

        <div
          className="card mb-3 mt-3"
          style={{
            float: "left",
            width: "20%",
            top: "20px",
            left: "20px",
            background: "#E2EDFF",
          }}
        >
          <div className="card-body">
            <p>강의명: {location.state.lecture_title}</p>
            <p>담당 교수: {location.state.professor_name}</p>
            <p>분반: {location.state.room}</p>
          </div>
        </div>
        {/* search form */}
        <form className="search">
          <input id="searchtext" type="text"></input>
          <button>
            <img
              id="searchbtn"
              src="https://e7.pngegg.com/pngimages/446/413/png-clipart-computer-icons-button-search-box-button-window-rim.png"
            ></img>
          </button>
        </form>
        <div className="lecture-list">
          <div className="card mb-2 mt-2 rounded">
            <div className="card-body listheader">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p className="lecture-text">과제명</p>
                <p
                  className="lecture-text"
                  style={{ textAlign: "right", paddingRight: "60px" }}
                >
                  진행상황
                </p>
              </div>
            </div>
          </div>
          {assignmentPropsList &&
            assignmentPropsList.map((assignment) => (
              <Assignment assignment={assignment} />
            ))}
          {isProfessor == true && (
            <>
              <button
                type="submit"
                onClick={onClickToggledeleteModal}
                style={{ float: "right" }}
              >
                과제 삭제
              </button>
              <button
                type="submit"
                onClick={newAssignment}
                style={{ float: "right" }}
              >
                과제 추가
              </button>
            </>
          )}
          <Paging />
        </div>
      </div>
    </>
  );
};

export default AssignmentPage;
