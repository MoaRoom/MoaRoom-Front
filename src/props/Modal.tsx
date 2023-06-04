import React, { PropsWithChildren } from "react";
import "../style/home.css";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <div>
      <dialog
        className="dialog-box"
        style={{
          height: "auto",
        }}
      >
        {children}
      </dialog>
      <div
        className="backdrop"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </div>
  );
}

export default Modal;
