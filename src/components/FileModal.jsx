import "./FileModalStyle.css";
import { RiCloseLine } from "react-icons/ri";
const FileModal=({setFileModal,url})=>{
    return(<>
        <div className="darkBG1" onClick={()=>setFileModal(false)} />
        <div className="centered1">   
            <button className="closeBtn1" onClick={()=>setFileModal(false)} >
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
           <iframe className="fileModal1" src={url} type="application/pdf" />
        </div>
      </>);
}
export default FileModal;