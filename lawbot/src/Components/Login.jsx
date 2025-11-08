import classes from "../Styles/Login.module.css";
import Navbar from "./Navbar";
import moralLady from "../assests/moralLady.png";

export default function Login(){
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
                            <input placeholder="Your Email Address" type="email"/>
                            <br/>
                            <label>Password</label>
                            <input placeholder="password" type="password"/>
                        </div>

                        <div className={classes.bottom}>
                            <label><input type="checkbox"/>Remember me</label>
                            <a href="#">Forgot password?</a>
                        </div>

                       <button>Log In</button>
                       <label className={classes.signupLabel}>Don't have an account? <a href="/signup">Sign Up</a></label>

                    </div>
                </div>


                <div className={classes.right}>
                    <img src={moralLady} className={classes.moralLady}/>
                </div>
 


            </div>


        </div>
    )
}