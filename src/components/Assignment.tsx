import React, { FC, useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../style/home.css";
import Modal from "../props/Modal";
import Navbar from "./Navbar";
import axios from "axios";
import { stringify } from "querystring";

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
  // const location = useLocation();
  // const user_id = location.state.user_id;
  // TODO: lecture_id도 필요함!(res가 list로 변경될 경우)
  const user_id = "cc285810-16f4-45cd-ae7c-3433781afa78";

  const [url, setUrl] = useState<UrlResp | string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://moaroom-back.duckdns.org:8080/url/" + user_id)
      .then((response) => {
        setUrl(response.data.containerAddress);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="background">
        <Navbar />
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
        {loading && url ? (
          <div>Loading...</div>
        ) : (
          <iframe
            id="container"
            title="container iframe"
            allow="fullscreen"
            width="100%"
            height="700"
            src={url.toString()}
          />
        )}
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
