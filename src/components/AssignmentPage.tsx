import React, { FC, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../style/LecturePage.css";
import Paging from "../components/Paging";
import AssignmentList from "../props/AssignmentList";
import AssignmentModal from "../props/AssignmentModal";


const AssignmentPage: FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    const navigate = useNavigate();
      // delete modal
    const [isdeleteModalOpen, setdeleteModalOpen] = useState<boolean>(false);

    const onClickToggledeleteModal = useCallback(() => {
        setdeleteModalOpen(!isdeleteModalOpen);
    }, [isdeleteModalOpen]);
    const logout = () => {
        navigate("/home", {
            state: {},
          });
      };
      const mypage = () => {
        navigate("/mypage", {
            state: {},
          });
      };
      const deleteAssignment = (data: any) => {
        let params = {
          title: data.title,
          room: data.room,
        };
        console.log(params);
        // TODO 서버 나오면 디버깅 필요
        axios
          .post("http://localhost:3000/api/deleteAssignment", params)
          .then(function(response) {
            reset();
            setTimeout(() => {
              navigate("/login", {
                state: {},
              });
            }, 3000);
          })
          .catch(function(error) {
            console.log(error);
          });
      };
    
    return(
        <>
            <div className="background">
            <div
          className="navbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <div>
            <h3 className="m-3">Logo</h3>
          </div>
          <div>
            <button className="navbtn" onClick={logout}>
              로그아웃
            </button>
            <button className="navbtn" onClick={mypage}>
              마이페이지
            </button>
          </div>
        </div>
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
                  // type="submit"
                  onClick={deleteAssignment}
                >
                  강의 삭제
                </button>
              </div>
            </form>
          </AssignmentModal>
        )}

        <div className="card mb-3 mt-3"
                     style={{
                        float: "left",
                        width: "20%",
                        top: "20px",
                        left: "20px",
                        background: "#E2EDFF"
                    }}>
            <div className="card-body">
            <p>강의명: 프로그래밍 입문</p>
            <p>담당 교수: 이종우</p>
            <p>분반: 1</p>
            </div>
        </div>
              {/* search form */}
              <form className="search">
                <input id="searchtext" type="text"></input>
                <button>
                  <img id="searchbtn" src="https://e7.pngegg.com/pngimages/446/413/png-clipart-computer-icons-button-search-box-button-window-rim.png"></img>
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
                <p className="lecture-text" style={{textAlign:"right", paddingRight:"60px"}}>진행상황</p>
            </div>
            </div>
            </div>
            <AssignmentList />
            <Paging />
            <button style={{
                float:"right"
            }}>과제 추가</button>
            <button 
                type="submit"
                onClick={onClickToggledeleteModal}
            style={{
                float:"right"
            }}>과제 삭제</button>

            </div>
            </div>
        </>
    )
}

export default AssignmentPage;