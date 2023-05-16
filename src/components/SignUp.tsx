import React, { FC, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../style/home.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
type SomeComponentProps = RouteComponentProps;
const SignUp: FC<SomeComponentProps> = ({ history }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // nav bar login btn
  const login = () => {
    localStorage.clear();
    history.push("/login");
  };
  // The selected role
  const [selectedRole, setSelectedRole] = useState<String>();
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
  };
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
        <div className="navbar">
          <div
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
              <button type="submit" className="homeloginbtn" onClick={login}>
                로그인
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div
              className="card mb-3 mt-3 rounded"
              style={{ maxWidth: "500px" }}
            >
              <div className="col-md-12">
                <div className="card-body">
                  <h3 className="card-title text-center text-secondary mt-3 mb-3">
                    {/* Sign Up Form */}
                  </h3>
                  <form
                    className="row"
                    autoComplete="off"
                    onSubmit={handleSubmit(submitData)}
                  >
                    <div className="">
                      <label className="form-label">아이디</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("user_id", {
                          required: "user_id is required!",
                        })}
                      />
                      {errors.user_id && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {/* {errors.user_id.message} */}
                          errors.user_id.message
                        </p>
                      )}
                    </div>
                    <div className="">
                      <label className="form-label">비밀번호</label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput2"
                        {...register("password", {
                          required: "Password is required!",
                        })}
                      />
                      {errors.password && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {/* {errors.password.message} */}
                          errors.password.message
                        </p>
                      )}
                    </div>
                    <div className="">
                      <label className="form-label">이름</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput3"
                        {...register("name", {
                          required: "name is required!",
                        })}
                      />
                      {errors.name && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          errors.name.message
                        </p>
                      )}
                    </div>
                    <div className="">
                      <label className="form-label">학번</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput4"
                        {...register("user_num", {
                          required: "user_num is required!",
                        })}
                      />
                      {errors.user_num && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          errors.user_num.message
                        </p>
                      )}
                    </div>
                    <div className="">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingLeft: 50,
                          paddingRight: 50,
                          paddingBlock: 10,
                        }}
                      >
                        <p>
                          <input
                            type="radio"
                            value="0"
                            id="student"
                            onChange={radioHandler}
                          />
                          <label htmlFor="student">학생</label>
                        </p>
                        <p>
                          <input
                            type="radio"
                            value="1"
                            id="professor"
                            onChange={radioHandler}
                          />
                          <label htmlFor="professor">교수</label>
                        </p>
                      </div>
                    </div>

                    <div className="text-center mt-4 ">
                      <button
                        className="btn btn-outline-primary text-center shadow-none mb-3"
                        type="submit"
                        onClick={submitData}
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
export default SignUp;