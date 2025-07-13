import React from "react";
import Modal from "react-modal";
import Styles from "./denied.module.css";
import denied from "../../Assets/denied.png";
function Popup({ showModal, setModal }) {
    const closeModal = () => {
        setModal(false);
    };
    return (
        <>
            <Modal
                isOpen={showModal}
                contentLabel="Modal"
                className={Styles["modal"]}
                onRequestClose={closeModal}
                overlayClassName={Styles["overlay"]}>
                <div className={Styles["wrapper"]}>
                    <img src={denied} alt="denied" />
                </div>
            </Modal>
        </>
    );
}

export default Popup;
