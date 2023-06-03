import React, { FC, useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../props/Modal";
import File from "../props/File";
import "../style/home.css";
import Navbar from "./Navbar";
const Score: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // user info
  const location = useLocation();
  const { user_name } = location.state;
  // nav bar login btn
  const navigate = useNavigate();
  const updateProfile = () => {};
  const deleteProfile = () => {};

  // create modal
  const [isautoModalOpen, setautoModalOpen] = useState<boolean>(false);

  const onClickToggleautoModal = useCallback(() => {
    setautoModalOpen(!isautoModalOpen);
  }, [isautoModalOpen]);

  // delete modal
  const [ismanualModalOpen, setmanualModalOpen] = useState<boolean>(false);

  const onClickTogglemanualModal = useCallback(() => {
    setmanualModalOpen(!ismanualModalOpen);
  }, [ismanualModalOpen]);

  // data
  const [assignments, setAssignments] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:8002/assignment/?id=1914395&assignment_id=1a2b")
      .then((response) => {
        setAssignments(JSON.parse(response.data).content);
      });
  }, []);

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
          navigate("/login", {
            state: {},
          });
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
          navigate("/login", {
            state: {},
          });
        }, 3000);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="background">
        <Navbar />
        {isautoModalOpen && (
          <Modal onClickToggleModal={onClickToggleautoModal}>
            <form autoComplete="off" onSubmit={handleSubmit(createLecture)}>
              <div className="mt-4 mb-3 text-center ">
                <button
                  className="btn btn-outline-primary text-center shadow-none mb-3 align-items-center"
                  // type="submit"
                  onClick={createLecture}
                >
                  자동 채점
                </button>
              </div>
            </form>
          </Modal>
        )}
        {ismanualModalOpen && (
          <Modal onClickToggleModal={onClickTogglemanualModal}>
            <form autoComplete="off" onSubmit={handleSubmit(deleteLecture)}>
              <div className="mt-3 mb-3">
                <label className="form-label">점수 입력란</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  id="exampleFormControlInput3"
                  {...register("score", {
                    required: "score is required!",
                  })}
                />
                {errors.score && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    errors.score.message
                  </p>
                )}
              </div>
              <div className="mt-4 mb-3 text-center ">
                <button
                  className="btn btn-outline-info text-center shadow-none mb-3"
                  // type="submit"
                  onClick={deleteLecture}
                >
                  수동 채점
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
            <div className="card mb-6 mt-3 profile-lecture-box">
              <File content={assignments} />
            </div>
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
                      <p className="">이름: {user_name}</p>
                      <p className="">학번: 1914395</p>
                      <p className="">강의명: 프로그래밍 입문</p>
                      <p className="">교수: 이종우</p>
                      <p className="">분반: 001</p>
                      <p className="">과제명: 프로그래밍 리포트 #1</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-outline-primary text-center shadow-none mb-3"
                type="submit"
                onClick={onClickToggleautoModal}
              >
                자동 채점
              </button>
              <button
                className="btn btn-outline-info text-center shadow-none mb-3"
                type="submit"
                onClick={onClickTogglemanualModal}
              >
                수동 채점
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Score;
