import React, { FC, useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../props/Modal";
import File from "../props/File";
import "../style/home.css";
import Navbar from "./Navbar";
import api from "../utils/api";
import axios from "axios";
const Score: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  interface UserResp {
    userId: string;
    id: string;
    password: string;
    name: string;
    userNum: number;
    role: number;
    classes: string[];
  }
  interface UrlResp {
    id: string;
    lectureId: string;
    containerAddress: string;
    apiEndpoint: string;
  }
  interface LectureResp {
    lectureId: string;
    title: string;
    professorId: string;
    room: number;
    professor_name: string;
  }
  interface AssignmentResp {
    assignmentId: string;
    lectureId: string;
    title: string;
    startDate: string;
    dueDate: string;
    description: string;
  }

  // 제출 페이지와 연동
  const location = useLocation();
  const student_id = location.state.student_id; //student
  const assignment_id = location.state.assignment_id;
  const lecture_id = location.state.lecture_id;
  const professor_id = location.state.professor_id;
  const isProfessor = location.state.isProfessor;

  // nav bar login btn
  const navigate = useNavigate();

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
  const [assignment, setAssignment] = useState<AssignmentResp>();
  const [code, setCode] = useState<string>("");
  const [user, setUser] = useState<UserResp>();
  const [lecture, setLecture] = useState<LectureResp>();
  const [url, setUrl] = useState<UrlResp>();

  // You may need an appropriate loader to handle this file type.
  // 위 에러 나는데 어떻게 해결해야할지를 몰라서 일단 다 useState 때림
  const [name, setName] = useState<string>("");
  const [userNum, setUserNum] = useState<string>("");
  const [lectitle, setLectitle] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [asgntitle, setAsgntitle] = useState<string>("");
  const [lid, setLid] = useState<string>("");
  const [pname, setPname] = useState<string>("");
  const [apiEP, setApiEP] = useState<string>("");
  const [score, setScore] = useState<number>();

  useEffect(() => {
    api.client.get("/users/" + student_id).then((response) => {
      // setUser(JSON.parse(JSON.stringify(response.data)));
      setName(JSON.parse(JSON.stringify(response.data)).name);
      setUserNum(JSON.parse(JSON.stringify(response.data)).userNum);
    });
  }, []);

  useEffect(() => {
    if (professor_id != "") {
      api.client.get("/users/" + professor_id + "/urls").then((response) => {
        // professor has multiple url models but only on apiEnpoint
        response.data.map((urlmodel: any) => {
          setUrl(urlmodel);
          setApiEP(urlmodel.apiEndpoint);
          // console.log(urlmodel.apiEndpoint);
        });
      });
    }
  }, [professor_id]);

  useEffect(() => {
    api.client.get("/assignments/" + assignment_id).then((response) => {
      console.log(
        "answer: " + JSON.parse(JSON.stringify(response.data)).answer
      );
    });
  }, []);

  useEffect(() => {
    if (apiEP != "") {
      axios
        .get(
          apiEP +
            "/assignment/?id=" +
            student_id +
            "&assignment_id=" +
            assignment_id
        )
        .then((response) => {
          setCode(JSON.parse(response.data).content);
          console.log(JSON.parse(response.data));
          console.log("student answer: " + JSON.parse(response.data).answer);
        });
    }
  }, [apiEP]);

  useEffect(() => {
    api.client.get("/assignments/" + assignment_id).then((response) => {
      setAssignment(JSON.parse(JSON.stringify(response.data)));
      setAsgntitle(JSON.parse(JSON.stringify(response.data)).title);
    });
  }, []);
  useEffect(() => {
    api.client.get("/lectures/info/" + assignment_id).then((response) => {
      setLecture(response.data);
      setLectitle(response.data.title);
      setRoom(response.data.room);
      setPname(response.data.professor_name);
      setLid(response.data.lecture_id);
    });
  }, []);

  const manualScore = (data: any) => {
    let params = {
      lecture_id: lid,
      assignment_id: assignment_id,
      user_id: student_id,
      score: data.score,
    };
    console.log(params);
    api.client
      .post("/assignments/score", params)
      .then(function(response) {
        console.log(response);
        setmanualModalOpen(!ismanualModalOpen);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="background">
        <Navbar
          navProps={{ user_id: professor_id, isProfessor: isProfessor }} // professor_id가 user_id로써 넘어옴(용도에 맞게)
        />
        {ismanualModalOpen && (
          <Modal onClickToggleModal={onClickTogglemanualModal}>
            <form autoComplete="off" onSubmit={handleSubmit(manualScore)}>
              <div className="mt-3 mb-3">
                <label className="form-label">점수 입력란</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  id="exampleFormControlInput3"
                  {...register("score", {
                    required: "score is required!",
                  })}
                  value={score}
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
                  onClick={manualScore}
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
              <File content={code} />
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
                      <p className="">이름: {name}</p>
                      <p className="">학번: {userNum}</p>
                      <p className="">강의명: {lectitle}</p>
                      <p className="">교수: {pname}</p>
                      <p className="">분반: {room}</p>
                      <p className="">과제명: {asgntitle}</p>
                    </div>
                  </div>
                </div>
              </div>
              {isProfessor && (
                <button
                  className="btn btn-outline-info text-center shadow-none mb-3"
                  type="submit"
                  onClick={onClickTogglemanualModal}
                >
                  수동 채점
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Score;
