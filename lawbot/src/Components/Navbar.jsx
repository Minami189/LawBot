import {FaBars, FaTimes} from "react-icons/fa";
import {useRef} from "react";
import classes from "../Styles/main.module.css"


function Navbar() {

    const navRef = useRef();


    const showNavbar = () =>{
        // assigns the class "responsive_nav to apply responsive styling"
        navRef.current.classList.toggle(classes.responsive_nav);
    }

    return (  
        <header className={classes.header}>
            <div className={classes.logo}>
                 <h2>LawBot</h2>
            </div>
           
        

            <nav className={classes.centerNav}>
                <a href="/#">Home</a>
                <a href="/#">About Us</a>
                <a href="/#">Help</a>
            </nav>

            <nav className={classes.rightNav}>
                <a href="/Login">Login</a>
                <a href="">Try For Free</a>
            </nav>

            <button className={`${classes.navBtn} ${classes.navCloseBtn} ${classes.button}`} onClick={showNavbar}>
                <FaTimes/>
            </button>


           

          

            <button className={`${classes.navBtn} ${classes.navCloseBtn} ${classes.button}`} onClick={showNavbar}>
                <FaBars/>
            </button>

        </header>
    );
}

export default Navbar;