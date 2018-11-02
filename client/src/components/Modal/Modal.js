import React from "react";
import { FormBtn, TextArea } from "../../components/Form";
import "./modal.css";

const Modal = ({ handleClose, show, children, props }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
            {children}
            <div className="modal-btn">
                <FormBtn onClick={() => handleClose("send")}>Send</FormBtn>
                <FormBtn onClick={() => handleClose("cancel")}>Close</FormBtn>
            </div>
        </section>
      </div>
    );
  };

  export default Modal;