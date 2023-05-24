import { RiCloseLine } from "react-icons/ri";
import "./ShareModalStyle.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { storage } from "../base.js";

import { getBlob, getBytes, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ShareModal = ({ setShowShare, currentFile }) => {
  const [showLink, setShowLink] = useState(false);
  const [url, setUrl] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    setShowPass(!showPass);
  };

  const getLink = () => {
    const file=getBlob(ref(storage,currentFile))
    
   
    getDownloadURL(ref(storage, currentFile))
      .then((Url) => {
        setUrl(Url);})
     
    setShowLink(true);
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
        <div className="centerItems">
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
            ></input>{" "}
            Enable Password protection
          </label>
          {showPass && (
            <input
              type="text"
              className="sharemodalpasswordinput"
              placeholder="Password for file"
            ></input>
          )}
        </div>
        <button className="btn btn-primary centered3" onClick={getLink}>
          Generate Share link
        </button>
      </div>
    </>
  );
};
export default ShareModal;
