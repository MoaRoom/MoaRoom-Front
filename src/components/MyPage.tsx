import React, { FC, useState, useCallback } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../style/home.css";
import LectureList from "../props/LectureList";
import Modal from "./Modal";
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
    history.push("/home");
  };
  const mypage = () => {
    localStorage.clear();
    history.push("/mypage");
  };
  const updateProfile = () => {};
  const deleteProfile = () => {};
  const createLecture = () => {};
  const deleteLecture = () => {};

  // The selected role
  const [selectedRole, setSelectedRole] = useState<String>();
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
  };

  // modal
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const submitData = (data: any) => {
    let params = {
      user_id: data.user_id,
      password: data.password,
      name: data.name,
      user_num: data.user_num,
      role: Number(selectedRole),
    };
    console.log(params);
    // TODO 서버 나오면 디버깅 필요
    axios
      .post("http://localhost:3000/api/signup", params)
      .then(function (response) {
        reset();
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      })
      .catch(function (error) {
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
        {/* {isOpenModal && (
          <Modal onClickToggleModal={onClickToggleModal}>
            이곳에 children이 들어갑니다.
          </Modal>
        )} */}
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
                onClick={onClickToggleModal}
              >
                강의 개설
              </button>
              <button
                className="btn btn-outline-danger text-center shadow-none mb-3"
                type="submit"
                onClick={deleteLecture}
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
