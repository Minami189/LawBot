import classes from "../Styles/login.module.css";
import Navbar from "./Navbar";
import moralLady from "../assests/Landing/moralLady.png";
import notvisibleIcon from "../assests/Login/eye-slash.svg"
import visibleIcon from "../assests/Login/eye.svg"
import { useState, useRef } from "react";


export default function Login(){
    const [showPass, setShowPass] = useState(false);
    const emailRef = useRef(null);
    const passRef = useRef(null);

    function handleVisible(){
        if (showPass) setShowPass(false);
        if (!showPass) setShowPass(true);
    }

    function handleLogin(){
        const email = emailRef.current.value;
        const pass = passRef.current.value;
        console.log(email, pass);
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

                        <div className={classes.bottom}>
                            <label><input type="checkbox"/>Remember me</label>
                            <a href="#">Forgot password?</a>
                        </div>
                        
                        <div className={classes.action}>
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