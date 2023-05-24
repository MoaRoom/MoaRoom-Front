import React, { FC, useState, useCallback } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../style/home.css";
import LectureList from "../props/LectureList";
import Modal from "../props/Modal";
type SomeComponentProps = RouteComponentProps;
const MyPage: FC<SomeComponentProps> = ({ history }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // nav bar login btn
  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  const mypage = () => {
    localStorage.clear();
    history.push("/mypage");
  };
  const updateProfile = () => {};
  const deleteProfile = () => {};

  // create modal
  const [iscreateModalOpen, setcreateModalOpen] = useState<boolean>(false);

  const onClickTogglecreateModal = useCallback(() => {
    setcreateModalOpen(!iscreateModalOpen);
  }, [iscreateModalOpen]);

  // delete modal
  const [isdeleteModalOpen, setdeleteModalOpen] = useState<boolean>(false);

  const onClickToggledeleteModal = useCallback(() => {
    setdeleteModalOpen(!isdeleteModalOpen);
  }, [isdeleteModalOpen]);

  const createLecture = (data: any) => {
    let params = {
      title: data.title,
      room: data.room,
    };
    console.log(params);
    // TODO 서버 나오면 디버깅 필요
    axios
      .post("http://localhost:3000/api/signup", params)
      .then(function(response) {
        reset();
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const deleteLecture = (data: any) => {
    let params = {
      title: data.title,
      room: data.room,
    };
    console.log(params);
    // TODO 서버 나오면 디버깅 필요
    axios
      .post("http://localhost:3000/api/signup", params)
      .then(function(response) {
        reset();
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
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
        {iscreateModalOpen && (
          <Modal onClickToggleModal={onClickTogglecreateModal}>
            <form autoComplete="off" onSubmit={handleSubmit(createLecture)}>
              <div className="mt-3 mb-3">
                <label className="form-label">강의명</label>
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
              <div className="mt-3 mb-3">
                <label className="form-label">분반</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  id="exampleFormControlInput3"
                  {...register("room", {
                    required: "room is required!",
                  })}
                />
                {errors.room && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    errors.room.message
                  </p>
                )}
              </div>
              <div className="mt-4 mb-3 text-center ">
                <button
                  className="btn btn-outline-success text-center shadow-none mb-3"
                  // type="submit"
                  onClick={createLecture}
                >
                  강의 개설
                </button>
              </div>
            </form>
          </Modal>
        )}
        {isdeleteModalOpen && (
          <Modal onClickToggleModal={onClickToggledeleteModal}>
            <form autoComplete="off" onSubmit={handleSubmit(deleteLecture)}>
              <div className="mt-3 mb-3">
                <label className="form-label">강의명</label>
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
              <div className="mt-3 mb-3">
                <label className="form-label">분반</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  id="exampleFormControlInput3"
                  {...register("room", {
                    required: "room is required!",
                  })}
                />
                {errors.room && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    errors.room.message
                  </p>
                )}
              </div>
              <div className="mt-4 mb-3 text-center ">
                <button
                  className="btn btn-outline-danger text-center shadow-none mb-3"
                  // type="submit"
                  onClick={deleteLecture}
                >
                  강의 삭제
                </button>
              </div>
            </form>
          </Modal>
        )}
        <div className="container">
          <div
            className="row d-flex justify-content-space-around"
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="card mb-3 mt-3 profile-box">
              <div className="card mb-3 mt-3 rounded" style={{ float: "left" }}>
                <div className="col-md-12">
                  <div className="card-body">
                    <h3 className="card-title text-center text-secondary mt-3 mb-3">
                      {/* Sign Up Form */}
                    </h3>
                    <div className="mb-3 text-center">
                      <img
                        className="profile-img"
                        src="https://blog.kakaocdn.net/dn/bj4oa7/btqLJWFLMgd/wu4GV8PKbXdICuyW0me0zk/img.jpg"
                      />
                    </div>
                    <div className="mb-1">
                      <p className="">이름: 이종우</p>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        float: "right",
                      }}
                    >
                      <button
                        className="btn btn-outline-primary text-center shadow-none mb-3"
                        type="submit"
                        onClick={updateProfile}
                      >
                        수정
                      </button>
                      &nbsp;&nbsp;
                      <button
                        className="btn btn-outline-primary text-center shadow-none mb-3"
                        type="submit"
                        onClick={deleteProfile}
                      >
                        탈퇴
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-outline-success text-center shadow-none mb-3"
                type="submit"
                onClick={onClickTogglecreateModal}
              >
                강의 개설
              </button>
              <button
                className="btn btn-outline-danger text-center shadow-none mb-3"
                type="submit"
                onClick={onClickToggledeleteModal}
              >
                강의 삭제
              </button>
            </div>
            <div className="card mb-6 mt-3 profile-lecture-box">
              <p className="">진행 중 강의</p>
              {/* 강의 리스트 */}
              <LectureList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
