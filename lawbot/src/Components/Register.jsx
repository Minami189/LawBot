import classes from "../Styles/register.module.css";
import Navbar from "./Navbar";
import moralLady from "../assests/Landing/moralLady.png";
import notvisibleIcon from "../assests/Login/eye-slash.svg"
import visibleIcon from "../assests/Login/eye.svg"
import { useState, useRef } from "react";

export default function Register(){
    const [showPass, setShowPass] = useState(false);
    const userRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);

    function handleRegister(){
        const email = emailRef.current.value;
        const pass = passRef.current.value;
        const user = userRef.current.value;

        console.log(email, pass, user);
    }

    function handleVisible(){
        if (showPass) setShowPass(false);
        if (!showPass) setShowPass(true);
    }
    return(
        <div className={classes.page}>
            <Navbar/>

            <div className={classes.mainContent}>

                <div className={classes.left}>
                    <div className={classes.loginCard}>

                        <div className={classes.loginHead}>
                            <h2>Create Your Account</h2>
                            <h3>Please fill in all fields to register</h3>
                        </div>

                        <div className={classes.inputs}>
                            <label>Username</label>
                            <input placeholder="Your Username" type="text" ref={userRef}/>
                            <br/>
                            <label>Your Email Address</label>
                            <input placeholder="Your Email Address" type="email" ref={emailRef}/>
                            <br/>
                            <label>Your Password</label>
                            <div className={classes.passwordInput}>
                                <input placeholder="password" type={showPass ? "text" : "password"} ref={passRef}/>
                                <img src={showPass ? visibleIcon : notvisibleIcon} onClick={handleVisible}/>
                            </div>  
                        </div>

                        <div className={classes.bottom}/>

                        <div className={classes.action}>
                            <button onClick={handleRegister}>Register</button>
                            <label className={classes.signupLabel}>Already have an account? <a href="/login">Log In</a></label>
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