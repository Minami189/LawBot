import classes from "./Login.module.css";
import Navbar from "../Navbar/Navbar.jsx";
import moralLady from "../../assests/Landing/moralLady.png";
import notvisibleIcon from "../../assests/Login/eye-slash.svg"
import visibleIcon from "../../assests/Login/eye.svg"
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AppContext} from "../../App.jsx";


export default function Login(){
    const [showPass, setShowPass] = useState(false);
    const [message, setMessage] = useState("");
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const navigate = useNavigate();
    const {setUserToken} = useContext(AppContext);

    function handleVisible(){
        if (showPass) setShowPass(false);
        if (!showPass) setShowPass(true);
    }
    
    async function handleLogin(){
        const email = emailRef.current.value;
        const pass = passRef.current.value;

        //kaya tayo nag fform data dito imbes na deretsong json nalang
        //para makuha natin via $_POST superglobal sa php neh
        const loginData = new FormData;
        loginData.append("email", email);
        loginData.append("password", pass);
        const response = await fetch("http://localhost/backend/login.php",{
            method: "POST",
            body: loginData
        });

        const {message, token, success} = await response.json();

        if(!success){
            setMessage(message)
            setTimeout(()=>{
                setMessage("")
            }, 2000)
            return;
        }
        

        localStorage.clear();
        setUserToken(token);
        localStorage.setItem("userInfo", token);        
        
        navigate("/dashboard");
    }



    return(
        <div className={classes.page}>
            <Navbar/>

            <div className={classes.mainContent}>

                <div className={classes.left}>
                    <div className={classes.loginCard}>
                        <div className={classes.top}>
                            <h1>LawBot</h1>
                        </div>


                        <div className={classes.loginHead}>
                            <h2>Welcome Back</h2>
                            <h3>Please enter your details to log in</h3>
                        </div>

                        <div className={classes.inputs}>
                            <label>Your Email Address</label>
                            
                            <input placeholder="Your Email Address" type="email" ref={emailRef}/>
                    
                            <label>Password</label>

                            <div className={classes.passwordInput}>
                                <input placeholder="password" type={showPass ? "text" : "password"} ref={passRef}/>
                                <img src={showPass ? visibleIcon : notvisibleIcon} onClick={handleVisible}/>
                            </div>  

                        </div>

                        
                        <div className={classes.action}>
                            <p>{message}</p>
                            <button onClick={handleLogin}>Log In</button>
                            <label className={classes.signupLabel}>Don't have an account? <a href="/signup">Sign Up</a></label>
                        </div>


                    </div>
                </div>


                <div className={classes.right}>
                    <img src={moralLady} className={classes.moralLady}/>
                </div>
 
            </div>


        </div>
    )
}