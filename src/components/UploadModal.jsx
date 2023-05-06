import React, { useState } from "react";
import "./ModalStyle.css";
import { RiCloseLine } from "react-icons/ri";

const UploadModal = ({ setIsOpen }) => {
  const [selectEducation, setSelectEducation] = useState(false);
  const [selectId, setSelectId] = useState(false);
  let color1 = "#F8F9F9";
  const [textColor, setTextColor] = useState("#0E0301");

  const [colorChanged, setColorChanged] = useState(false);
  const [bgColor, setBgColor] = useState(color1);
  const changeColor = () => {
    if (colorChanged == false) {
      let color2 = "#020000";
      setBgColor(color2);
      setColorChanged(true);
      setTextColor("#F8F9F9");
    } else {
      setBgColor(color1);
      setColorChanged(false);
      setTextColor("#0E0301");
    }
  };
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Dialog</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">Categories</div>
          <div className="categories">
            <div
              className="category"
              style={{ background: bgColor, color: textColor }}
              onClick={changeColor}
            >
              Education
            </div>
            <div
              className="category"
              style={{ background: bgColor, color: textColor }}
              onClick={changeColor}
            >
              ID
            </div>
            <div
              className="category"
              style={{ background: bgColor, color: textColor }}
              onClick={changeColor}
            >
              Hospital
            </div>
            <div
              className="category"
              style={{ background: bgColor, color: textColor }}
              onClick={changeColor}
            >
              Personal
            </div>
            <div
              className="category"
              style={{ background: bgColor, color: textColor }}
              onClick={changeColor}
            >
              Certificate
            </div>
            <div
              className="category"
              style={{ background: bgColor, color: textColor }}
              onClick={changeColor}
            >
              Work/Office
            </div>
            <div
              className="category"
              style={{ background: bgColor, color: textColor }}
              onClick={changeColor}
            >
              Reciept
            </div>
          </div>
          <div className="modalContent">Document Name</div>
          <input type="text" className="modalContentText" id="name"/>

          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                Upload
              </button>
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModal;
