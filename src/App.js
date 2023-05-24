import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom';
import "./App.css";
import FileModal from "./components/FileModal";
import UploadModal from "./components/UploadModal";
import styles from "./App.module.css";
import {auth} from "./base.js";
import { listAll, ref, list } from "firebase/storage"; //, uploadBytes
import FilesCategory from "./components/FilesCategory";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MainApp from "./pages/MainApp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Button } from "bootstrap";
import About from "./pages/About";
import {GrDocumentLocked} from 'react-icons/gr';
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignUp from "./pages/Signup";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState();
  const [fileModal,setFileModal]=useState(false);
  const [url,setUrl]=useState();
  const [uploadedFile,setUploadedFile]=useState("");

 const [userEmail,setUserEmail]=useState();
  const[user,setUser]=useState(false);
  const logout=async()=>{
    await signOut(auth);
    setUser(false);
    setUserEmail("");
  }
  onAuthStateChanged(auth,(currentUser)=>{
    if(currentUser!=null){
      setUserEmail(currentUser.email)
      setUser(true);
    }
  })

  return (
    <div className="mainbg container-fluid">
    <BrowserRouter>
   
      <div className="displayover">
     <Link to='/'className="navbaritems">Home</Link>
      <Link to={user?'/app':'/login'} className="navbaritems">Dashboard</Link>
      <Link to='/about' className="navbaritems">About</Link>
    
    {!user && <Link to='/login'className="navbaritemslogin">Login</Link>}
    {!user && <Link to='/signup'className="navbaritemssignup">SignUp</Link>}
    {user && <Link to='/login'className="navbaritemssignup" onClick={logout}>Logout</Link>}
      <div className="currentuseremail">{userEmail}</div>
      
      </div>
    <Routes>
      <Route path="/" element={<Home user={user}/>}></Route>
      <Route path="/login" element={<Login user={user} setUser={setUser} auth={auth}/>}></Route>
      <Route path="/signup" element={<SignUp user={user} setUser={setUser} auth={auth}/>}></Route>
      <Route path="/app" element={<MainApp user={user} setUser={setUser} userEmail={userEmail} setUserEmail={setUserEmail} />}></Route>
      <Route path="/about" element={<About/>}></Route>
    </Routes>
    </BrowserRouter>
    
      
    </div>
  );
}

export default App;
