import { RiCloseLine } from "react-icons/ri";
import "./ShareModalStyle.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { storage } from "../base.js";
import { PDFDocument } from 'pdf-lib-plus-encrypt'

import { getBlob, getBytes, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ShareModal = ({ setShowShare, currentFile }) => {
  const [showLink, setShowLink] = useState(false);
  const [url, setUrl] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const[showCheck,setShowCheck]=useState(true);
  const [passwordProtect,setPasswordProtect]=useState(false);
  const [password,setPassword]= useState("");
  const [encryptLoading,setEncryptLoading]=useState(false);
  const [showButton,setShowButton]=useState(true)

  const handleChange = () => {
    setChecked(!checked);
    setShowPass(!showPass);
    setPasswordProtect(true);
  };

  const getLink = async() => {
    setShowCheck(false);
    let filepath;
    if(passwordProtect){
      setEncryptLoading(true)
    getBytes(ref(storage,currentFile)).then(res=>{
      console.log(res,currentFile);
      PDFDocument.load(res).then((pdf)=>{
        var encryptionDict = {
          'length': 128,
          'permission': 'print',
        };
        
        pdf.encrypt({
          userPassword: password,
          ownerPassword: password,
          encryptionFlags: encryptionDict,
        });
    
        pdf.save({
          data: new Uint8Array(res),
        }).then(function(data) {
          var blob = new Blob([data], { type: 'application/pdf' });
          let path=currentFile.split('/')
          let completePath=path[0]+'/'+path[1]+'/protected'+'/'+path[2]
          filepath=completePath
          uploadBytes(ref(storage,completePath), blob).then((snapshot) => {
            console.log("Uploaded file", snapshot);
            getDownloadURL(ref(storage, filepath))
            .then((Url) => {
              setUrl(Url);})
           setEncryptLoading(false)
          setShowLink(true);
          setPasswordProtect(false);
          setShowButton(false)
            
          });
          // var url = URL.createObjectURL(blob);
          // window.open(url); // Open the encrypted PDF in a new tab
        });
      })
      
    })
  }else{
    getDownloadURL(ref(storage, currentFile))
    .then((Url) => {
      setUrl(Url);
    setShowButton(false)})
   
  setShowLink(true);
  }
   
  };
  return (
    <>
      <div className="darkBG2" onClick={() => setShowShare(false)} />
      <div className="centered2">
        <button className="closeBtn2" onClick={() => setShowShare(false)}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <div className="sharemodaltext">
          Share file {currentFile.split("/")[1]}
        </div>
        <p>
          Create password protected files to share them securely to trusted
          people. Click enable password protection to set password or you can
          simply generate the link without password protection.
        </p>
        {showLink && (
          <div className="centerItems">
            <textarea
              type="text"
              className="sharemodaltextinput"
              value={url}
              readOnly
            ></textarea>
          </div>
        )}
        {encryptLoading && <div className="loading">
      <div className="loading-spinner"></div>
      Loading
    </div>}
        <div className="centerItems">
          {showCheck &&<label>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
            ></input>{" "}
            Enable Password protection
          </label>}
          {showPass && (
            <input
              type="text"
              className="sharemodalpasswordinput"
              placeholder="Password for file"
              onChange={(event)=>setPassword(event.target.value)}
            ></input>
          )}
        </div>
       {showButton && <button className="btn btn-primary centered3" onClick={getLink}>
          Generate Share link
        </button>}
      </div>
    </>
  );
};
export default ShareModal;
