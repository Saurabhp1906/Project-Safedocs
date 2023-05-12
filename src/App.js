import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import "./App.css";
import FileModal from "./components/FileModal";
import UploadModal from "./components/UploadModal";
import styles from "./App.module.css";
import storage from "./base.js";
import { listAll, ref, list } from "firebase/storage"; //, uploadBytes
import FilesCategory from "./components/FilesCategory";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState();
  const [fileModal,setFileModal]=useState(false);
  const [url,setUrl]=useState();
  const [uploadedFile,setUploadedFile]=useState("");
  

  return (
    <>
     <div className="backgroundImage ">
     {isOpen && <UploadModal setIsOpen={setIsOpen} setUploadedFile={setUploadedFile} uploaded={uploadedFile}/>}
     {/* {isOpen && <FileModal />} */}
        <h1 className="titlecolor">SafeDocs</h1>
       
        <div className="left">
          <div className="container text-center">
            <div className="col">
              <div className="row">
                <div className="block">
                  Upload your documents to our cloud storage to access them
                  anywhere on any device. You can enable password protect file
                  sharing with SafeDocs.
                </div>
              </div>
              <div className="row">
                <div className="block">
                  <button
                    className={styles.primaryBtn}  onClick={() =>{
                      setIsOpen(true);
                      console.log(isOpen);
                    }}                
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <FilesCategory setUrl={setUrl} setFileModal={setFileModal} uploadedFile={uploadedFile}/>
          
          {fileModal && <FileModal setFileModal={setFileModal} url={url}/>}
        </div>
       
      </div>
      
    </>
  );
}

export default App;
