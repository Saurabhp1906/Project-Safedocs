import React, { useState } from "react";
import "./ModalStyle.css";
import { RiCloseLine } from "react-icons/ri";
import { uploadBytes, ref } from "firebase/storage";
import { storage } from "../base";

const UploadModal = ({
  setIsOpen,
  setUploadedFile,
  uploadedFile,
  userEmail,
}) => {
  const [uploadFolder, setUploadFolder] = useState("");
  const [uploadFile, setUploadFile] = useState();
  const [uploadFileName, setUploadFileName] = useState("");
  const [loading, setLoading] = useState(true);
  const categoriesInUpload = [
    "Education",
    "Work",
    "Personal",
    "Certificate",
    "Hospital",
    "Reciept",
    "ID",
  ];
  const [selectedStates, setSelectedStates] = useState({
    Education: true,
    Work: true,
    ID: true,
    Personal: true,
    Certificate: true,
    Reciept: true,
    Hospital: true,
  });
  const changeColor = (event) => {
    const folder = event.target.id.toString();
    console.log(folder);

    Object.keys(selectedStates).forEach((item) => {
      if (item.toString() == folder) selectedStates[item] = false;
      else selectedStates[item] = true;
    });
    console.log(selectedStates);
    // console.log(selectedStates);
    setUploadFolder(event.target.id);
  };
  const upload = () => {
    if (uploadFile == null) return;
    // Sending File to Firebase Storage
    const folderRef = ref(storage, userEmail + "/" + uploadFolder + "/");
    const fileRef = ref(folderRef, uploadFileName);
    uploadBytes(fileRef, uploadFile).then((snapshot) => {
      console.log("Uploaded file", snapshot);
      setUploadedFile(userEmail + "/" + uploadFolder + "/" + uploadFileName);
      alert("File uploaded");
    });
  };
  const uploadFileToFirebase = () => {
    console.log("uploadFileToFirebase called");
    console.log(uploadFolder + "  ", uploadFile + "   ", uploadFileName);
    if (uploadFolder != "" && uploadFile != null && uploadFileName != "") {
      upload();
      setIsOpen(false);
    } else alert("Missing upload fields");
  };
  const handleChange = (event) => {
    setUploadFileName(event.target.value);
  };
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />

      <div className="centered">
        <div>
          <div className="modalHeader">
            <h5 className="heading">Upload File</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">Categories</div>
          <div className="categories">
            {categoriesInUpload.map((item) => {
              return (
                <div
                  className={
                    selectedStates[item] ? "category" : "categoryclick"
                  }
                  onClick={changeColor}
                  id={item}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="modalContent">Document Name</div>
          <input
            type="text"
            className="modalContentText"
            id="name"
            onChange={handleChange}
          />
          <div className="inputFile">
            <input
              placeholder="pdf file"
              type="file"
              onChange={(e) => {
                setUploadFile(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
            />
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="deleteBtn"
                onClick={() => {
                  uploadFileToFirebase();
                }}
              >
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
