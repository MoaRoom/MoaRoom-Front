import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../style/home.css";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RouteComponentProps } from "react-router";
type SomeComponentProps = RouteComponentProps;
const Login: FC<SomeComponentProps> = ({ history }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const goSignUp = () => {
    localStorage.clear();
    history.push("/register");
  };
  const login = (data: any) => {
    let params = {
      email: data.email,
      password: data.password,
    };
    console.log(params);
    // 일단 마이페이지로 이동
    localStorage.clear();
    history.push("/mypage");

    // TODO 서버 나오면 디버깅 필요
    axios
      .post("http://localhost:3000/api/login", params)
      .then(function(response) {
        //   IF EMAIL ALREADY EXISTS
        if (response.data.success === false) {
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
          setTimeout(() => {
            history.push("/");
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
            <button type="submit" className="navbtn" onClick={login}>
              로그인
            </button>
          </div>
        </div>
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
                        type="email"
                        className="form-control shadow-none"
                        id="exampleFormControlInput1"
                        {...register("email", {
                          required: "Email is required!",
                        })}
                      />
                      {errors.email && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          errors.email.message
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
                      />
                      {errors.password && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          errors.password.message
                        </p>
                      )}
                    </div>
                    <div
                      className="text-center mt-4 "
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingLeft: 50,
                        paddingRight: 50,
                      }}
                    >
                      <button
                        className="btn btn-outline-primary text-center shadow-none mb-3"
                        // type="submit"
                        onClick={login}
                      >
                        로그인
                      </button>
                      <button
                        className="btn btn-outline-primary text-center shadow-none mb-3"
                        // type="submit"
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
