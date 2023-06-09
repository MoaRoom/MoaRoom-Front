import React, { FC, useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/home.css";
import MyPageLectureList, { LectureType } from "../props/MyPageLectureList";
import Modal from "../props/Modal";
import Navbar from "./Navbar";
import { isDOMComponent } from "react-dom/test-utils";
const MyPage: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  type UserType = {
    userId: string;
    id: string;
    password: string;
    name: string;
    userNum: number;
    role: number;
    classes: string[];
  };

  const location = useLocation();
  const user_id = location.state.user_id; // professor or student
  const isProfessor = location.state.isProfessor;

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

  // data
  const [lectureList, setLectureList] = useState<LectureType[]>([]);
  const [userInfo, setUserInfo] = useState<UserType>();

  // state
  const [name, setName] = useState<string>("");
  const [userNum, setUserNum] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://moaroom-back.duckdns.org:8080/lecture/all/" + user_id)
      .then((response) => {
        setLectureList(response.data);
      });
  }, [lectureList, iscreateModalOpen, isdeleteModalOpen]); // refresh 가능하도록
  useEffect(() => {
    axios
      .get("http://moaroom-back.duckdns.org:8080/user/" + user_id)
      .then((response) => {
        setUserInfo(response.data);
        setName(response.data.name);
        setUserNum(response.data.userNum);
      });
  }, []);

  // nav bar login btn
  const navigate = useNavigate();

  // 유저 수정/탈퇴 관련
  // const updateProfile = () => {};
  // const deleteProfile = () => {};

  const createLecture = (data: any) => {
    let params = {
      title: data.title,
      professor_id: user_id,
      room: data.room,
      room_count: data.room_count,
    };
    console.log(params);

    axios
      .post("http://moaroom-back.duckdns.org:8080/lecture/new", params)
      .then(function(response) {
        if (response.data === "") {
          alert("강의 생성 안 됨");
        } else {
          alert("강의 생성 완료");
          setcreateModalOpen(!iscreateModalOpen);
        }
      })
      .catch(function(error) {
        console.log("delete" + error);
      });
  };
  const deleteLecture = (data: any) => {
    let params = {
      lecture_title: data.lecture_title,
      lecture_room: data.lecture_room,
    };
    // TODO: 강의 삭제 기능 구현
    // axios
    //   .delete(
    //     "http://moaroom-back.duckdns.org:8080/lecture/" +
    //       params.lecture_title +
    //       "/" +
    //       params.lecture_room
    //   )
    //   .then(function(response) {
    //     if (response.data === "") {
    //       alert("강의 삭제 안 됨");
    //     } else {
    //       alert("강의 삭제 완료");
    //       setdeleteModalOpen(!isdeleteModalOpen);
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <div className="background">
        <Navbar navProps={{ user_id: user_id, isProfessor: isProfessor }} />
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
              <div className="mt-3 mb-3">
                <label className="form-label">인원수(default: 30)</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  id="exampleFormControlInput3"
                  {...register("room_count", {
                    required: "room_count is required!",
                  })}
                />
                {errors.room_count && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    errors.room_count.message
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
                  {...register("lecture_title", {
                    required: "lecture_title is required!",
                  })}
                />
                {errors.lecture_title && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    errors.lecture_title.message
                  </p>
                )}
              </div>
              <div className="mt-3 mb-3">
                <label className="form-label">분반</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  id="exampleFormControlInput3"
                  {...register("lecture_room", {
                    required: "lecture_room is required!",
                  })}
                />
                {errors.lecture_room && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    errors.lecture_room.message
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
                      <p className="">이름: {name}</p>
                      <p className="">학번: {userNum}</p>
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        float: "right",
                      }}
                    >
                      {/* TODO: 유저 수정/탈퇴 관련 */}
                      {/* <button
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
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
              {isProfessor && (
                <button
                  className="btn btn-outline-success text-center shadow-none mb-3"
                  type="submit"
                  onClick={onClickTogglecreateModal}
                >
                  강의 개설
                </button>
              )}
              {isProfessor && (
                <button
                  className="btn btn-outline-danger text-center shadow-none mb-3"
                  type="submit"
                  onClick={onClickToggledeleteModal}
                >
                  강의 삭제
                </button>
              )}
            </div>
            <div className="card mb-6 mt-3 profile-lecture-box">
              <p className="">진행 중 강의</p>
              {/* 강의 리스트 */}
              <MyPageLectureList lectureList={lectureList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
