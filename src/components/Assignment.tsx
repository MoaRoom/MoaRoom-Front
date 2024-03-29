import React, { FC, useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../style/home.css";
import Modal from "../props/Modal";
import Navbar from "./Navbar";
import { navPropsType } from "./Navbar";
import api from "../utils/api";

const Assignment: FC = () => {
  interface UrlResp {
    id: string;
    lectureId: string;
    containerAddress: string;
    apiEndpoint: string;
  }

  // create modal
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

  // 제출 페이지와 연동
  // TODO: lecture_id도 필요함!(res가 list로 변경될 경우)
  const location = useLocation();
  const user_id = location.state.user_id;
  const lecture_id = location.state.lecture_id;

  const [url, setUrl] = useState<UrlResp | string>("");

  const [isProfessor, setIsProfessor] = useState<boolean>(false);

  useEffect(() => {
    api.client
      .get("/users/" + user_id + "/" + lecture_id+"/url")
      .then((response) => {
        setUrl(response.data.containerAddress);
      });
  }, []);

  useEffect(() => {
    api.client
      .get("/users/" + user_id)
      .then((response) => {
        if (response.data.role == 2) {
          setIsProfessor(true);
        } else {
        }
      });
  }, []);

  return (
    <>
      <div className="background">
        <Navbar
          navProps={
            { user_id: user_id, isProfessor: isProfessor } as navPropsType
          }
        />
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
          id="container"
          title="container iframe"
          allow="fullscreen"
          width="100%"
          height="700"
          src={url.toString()}
        />
      </div>
      <img
        onClick={onClickToggleModal}
        className="floating-button"
        src="https://cdn.icon-icons.com/icons2/3298/PNG/512/magnifying_glass_search_icon_208685.png"
      />
    </>
  );
};
export default Assignment;
