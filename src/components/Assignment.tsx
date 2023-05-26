import React, { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.css";
import Modal from "../props/Modal";
const Assignment: FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/", {
      state: {},
    });
  };
  const mypage = () => {
    navigate("/mypage", {
      state: {},
    });
  };
  // create modal
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

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
        {isModalOpen && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <h3>주의사항</h3>
            <ul>
              <li>작업물은 반드시 저장해주세요.</li>
              <li>
                과제는 마감시간에 일괄 수거됩니다. 마감시간을 반드시
                유의해주세요.
              </li>
              <li>그 외 주의사항들... 흠냐흠냐</li>
            </ul>
          </Modal>
        )}
        <iframe
          id="terminal"
          title="terminal iframe"
          allow="fullscreen"
          width="100%"
          height="700"
          src="http://localhost:8888"
        />
      </div>
      <button onClick={onClickToggleModal}>
        <img
          className="floating-button"
          src="https://cdn.icon-icons.com/icons2/3298/PNG/512/magnifying_glass_search_icon_208685.png"
        />
      </button>
    </>
  );
};
export default Assignment;
