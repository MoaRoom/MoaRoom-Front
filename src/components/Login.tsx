import React, { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../style/home.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import api from "../utils/api";
const Login: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });
  const { id, password } = loginInfo;
  const [user_id, setUserId] = useState<string>("");
  const [isProfessor, setIsProfessor] = useState<boolean>(false);

  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const goSignUp = () => {
    navigate("/register", {
      state: {},
    });
  };
  useEffect(() => {
    api.client
      .get("/users/" + user_id)
      .then((response) => {
        if (response.data.role == 2) {
          setIsProfessor(true);
        } else {
        }
      });
  }, [user_id]);
  const login = (data: any) => {
    let params = {
      id: data.id,
      password: data.password,
    };
    console.log(params);

    api.client
      .post("/login", params)
      .then(function(response) {
        if (response.data === "") {
          alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
          setLoginInfo({ id: "", password: "" });
          console.log(response);
          toast.error(response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        } else {
          console.log(response);
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          localStorage.setItem("auth", response.data.token);
          localStorage.setItem("isLogin", "True");
          setTimeout(() => {
            navigate("/lecture", {
              state: { user_id: response.data, isProfessor: isProfessor },
            });
          }, 3000);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="background">
        <Navbar navProps={{ user_id: user_id, isProfessor: isProfessor }} />
        <div className="container">
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="card mb-3" style={{ maxWidth: "320px" }}>
              <div className="col-md-12">
                <div className="card-body">
                  <h3 className="card-title text-center text-secondary mt-3">
                    {/* Login Form */}
                  </h3>
                  <form autoComplete="off" onSubmit={handleSubmit(login)}>
                    <div className="mb-3 mt-4">
                      <label className="form-label">아이디</label>
                      <input
                        type="id"
                        className="form-control shadow-none"
                        id="exampleFormControlInput1"
                        {...register("id", {
                          required: "id is required!",
                        })}
                        value={id}
                        onChange={onChangeInput}
                      />
                      {errors.id && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          errors.id.message
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">비밀번호</label>
                      <input
                        type="password"
                        className="form-control shadow-none"
                        id="exampleFormControlInput2"
                        {...register("password", {
                          required: "Password is required!",
                        })}
                        value={password}
                        onChange={onChangeInput}
                      />
                      {errors.password && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          errors.password.message
                        </p>
                      )}
                    </div>
                    <div className="text-center mt-4 ">
                      <button
                        className="btn btn-outline-primary text-center shadow-none mb-3"
                        type="submit"
                      >
                        로그인
                      </button>
                      <button
                        className="btn btn-outline-primary text-center shadow-none mb-3"
                        onClick={goSignUp}
                      >
                        회원가입
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          limit={1}
          transition={Flip}
        />
      </div>
    </>
  );
};
export default Login;
