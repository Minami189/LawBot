import {FaBars, FaTimes} from "react-icons/fa";
import {useRef} from "react";
import "../Styles/main.css"


function Navbar() {

    const navRef = useRef();

    const showNavbar = () =>{
        // assigns the class "responsive_nav to apply responsive styling"
        navRef.current.classList.toggle("responsive_nav");
    }

    return (  
        <header>
            <h2>LawBot</h2>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="/#">Login</a>
                <a href="/#">About Us</a>
                <a href="/#">Help</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>

            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaBars/>
            </button>

        </header>
    );
}

export default Navbar;