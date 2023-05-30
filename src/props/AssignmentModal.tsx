import React, { PropsWithChildren } from "react";
import "../style/AssignmentPage.css";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function AssignmentModal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <div>
      <dialog className="dialog-box">{children}</dialog>
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

export default AssignmentModal;
