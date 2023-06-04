import React, { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/AssignmentPage.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Navbar from "./Navbar";
const newAssignment: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // The selected role
  const [selectedRole, setSelectedRole] = useState<String>();
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [startDate, setStartDate] = useState<Date|null>(new Date());
  const [dueDate, setDueDate] = useState<Date|null>(null);
  const submitData = (data: any) => {
    let params = {
      lecture_id: location.state.lecture_id,
      user_id: location.state.user_id,
      title: data.title,
      start_date: startDate,
      due_date: dueDate,
      description: data.description,
    };
    console.log(params);
    // TODO 서버 나오면 디버깅 필요
    axios
      .post("http://moaroom-back.duckdns.org:8080/assignment/new", params)
      .then(function(response) {
        console.log(response.data)
        if (response.data == "새로운 과제 등록 완료"){
            navigate("/lecture", {
              state: { user_id:  location.state.user_id},
            });
        }
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
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="background">
      <Navbar />
        <div className="container">
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ height: "80vh"}}
          >
            <div
              className="card mb-3 mt-3 rounded"
              style={{ maxWidth: "80%", height:"50vh" }}
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
                      <label className="form-label">과제명</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("title", {
                          required: "title is required!",
                        })}
                      />
                      {errors.title && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {/* {errors.title.message} */}
                          errors.title.message
                        </p>
                      )}
                    </div>
                    <div className="">
                      <label className="form-label">오픈 예정일</label>
                      <DatePicker selected={startDate} onChange={date => setStartDate(date)} 
                        showTimeSelect
                        timeFormat="HH:mm" //시간 포맷 
                        timeIntervals={1}
                        timeCaption="time"
                        dateFormat="yyyy/MM/dd HH:mm" />
                      {errors.start_date && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {/* {errors.start_date.message} */}
                          errors.start_date.message
                        </p>
                      )}
                    </div>
                    <div className="">
                      <label className="form-label">마감일</label>
                      <DatePicker selected={dueDate} onChange={date => setDueDate(date)} 
                        showTimeSelect
                        timeFormat="HH:mm" //시간 포맷 
                        timeIntervals={1}
                        timeCaption="time"
                        dateFormat="yyyy/MM/dd HH:mm" />
                      {errors.due_date && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          errors.due_date.message
                        </p>
                      )}
                    </div>
                    <div className="">
                      <label className="form-label">설명</label>
                      <input
                        type="textarea"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput4"
                        {...register("description", {
                          required: "description is required!",
                        })}
                      />
                      {errors.description && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          errors.description.message
                        </p>
                      )}
                    </div>

                    <div className="text-center mt-4 ">
                      <button
                        className="btn btn-outline-primary text-center shadow-none mb-3"
                        type="submit"
                      >
                        생성하기
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
export default newAssignment;
