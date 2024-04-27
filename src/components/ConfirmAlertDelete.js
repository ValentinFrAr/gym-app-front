import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ConfirmAlertDelete = ({ onConfirm, message }) => {
  const handleClickDelete = () => {
    onConfirm();
  };

  const customUI = ({ onClose }) => (
    <div className="custom-ui">
      <h1 className="message-confirm">Are you sure?</h1>
      <p className="message-confirm">{message}</p>
      <button style={{ marginLeft: "0px", margin: "15px" }} onClick={onClose}>
        No
      </button>
      <button
        style={{ marginLeft: "10px", margin: "15px" }}
        onClick={() => {
          handleClickDelete();
          onClose();
        }}
      >
        Yes, Delete it!
      </button>
    </div>
  );

  const handleConfirmation = () => {
    const options = {
      customUI: customUI,
    };
    confirmAlert(options);
  };

  return (
    <div className="">
      <button onClick={handleConfirmation}>X</button>
    </div>
  );
};

export default ConfirmAlertDelete;
