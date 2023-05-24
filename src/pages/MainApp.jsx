import UploadModal from "../components/UploadModal";
import FilesCategory from "../components/FilesCategory";
import FileModal from "../components/FileModal";
import { useState } from "react";
import '../App.css';
import styles from "../App.module.css";
import { Link } from "react-router-dom";

export default function MainApp({userEmail,setUserEmail}){
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState();
    const [fileModal,setFileModal]=useState(false);
    const [url,setUrl]=useState();
    const [uploadedFile,setUploadedFile]=useState("");
    return<>
     <div className="backgroundImage ">
       
     {isOpen && <UploadModal setIsOpen={setIsOpen} setUploadedFile={setUploadedFile} uploaded={uploadedFile} userEmail={userEmail}/>}
     {/* {isOpen && <FileModal />} */}
       <div className="title">
Safedocs
       </div>
        
        <div className="left">
          <div className=" text-center">
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
          <FilesCategory setUrl={setUrl} setUserEmail={setUserEmail} setFileModal={setFileModal} uploadedFile={uploadedFile} userEmail={userEmail}/>
          
          {fileModal && <FileModal setFileModal={setFileModal} url={url}/>}
        </div>
       
      </div>
    </>
}