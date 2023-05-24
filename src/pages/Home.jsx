import './HomeStyle.css'
import homeimage from '../Images/hm1.png'
import { useNavigate } from "react-router-dom";
export default function Home({user}){
    const navigate=useNavigate();
return(
    <div className="home">
    <div className="titlehome">
        SafeDocs
    </div>
    <table>
        <tr>
            <td width='70%'>
            <div className="text">
        
        Keep your files safe, secure, and organized with SafeDocs. Our cloud storage platform makes it easy to store and share documents from anywhere, anytime. Password protect your files for added security, and easily manage them category-wise for maximum convenience. With SafeDocs, you can be sure your documents are always safe and sound.
        
        </div>
        <button className='btn btn-light btn-lg homebtn' onClick={()=>navigate(user?'/app':"/login")}>Get started</button>
        <button className='btn btn-light btn-lg homebtn'>Learn more about the app</button>
            </td>
            <td>
            <img src={homeimage} height="70%" width="70%" className='homeimage'></img>
            </td>
        </tr>
    </table>
   
   
    <div>
       
    </div>
    </div>
);
}