import './LoginStyle.css'
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword} from 'firebase/auth';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
export default function SignUp({setUser,user,auth}) {
    const [email,setEmail]=useState();
    const [password, setPassword]=useState();
    const [invalidCred,setInvalidCred]=useState(false);
    let navigate=useNavigate();

    const signup=()=>{ 
        createUserWithEmailAndPassword(auth,email,password).then((user)=>{
            setUser(true);
        localStorage.setItem('userEmail',email);
        navigate('/app')
        }).catch(error=>{setInvalidCred(true)})
        
    }
    const getEmail=(event)=>{
        setEmail(event.target.value);
    }
    const getPassword=(event)=>{
        setPassword(event.target.value);
    }
  return(
  <>
  <div className="loginpage">
    <div className="logindialog">
        <h2 className='loginheader'>Signup</h2>
       {invalidCred && <div className='cred'>Cannot create user</div>}
        <label className='loginlabel'>Username</label>
    <input type='text' placeholder="Email" className='loginfields' onChange={getEmail}></input>
    <br></br>
    <label className='loginlabel'>Password</label>
    <input type='password' placeholder="Password" className='loginfields' onChange={getPassword}></input>
    <br></br>
    <button className='btn btn-primary loginbutton' onClick={signup}>Singup</button>
    </div>
  </div>
  </>);
}
