import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons';
import classes from "./Footer.module.css";
import logo from "../../assests/logo.png";

function Footer() {
    return (
        <div className={classes.mainFooter}>
            <footer className={classes.footer}>
                <div className={classes.footerLeft}>
                    <div className={classes.footerTop}>
                        <img className={classes.footerLogo} src={logo} alt="Lawbot Logo"/>
                        <p className={classes.footerName}>Lawbot</p>
                    </div>
                    <div className={classes.footerContent}>
                        <p>
                            Empowered by AI, Lawbot advances legal understanding by
                            summarizing and analyzing documents—delivering clarity,
                            accuracy, and insight for informed decisions.
                        </p>
                    </div>
                    <div className={classes.footerAccounts}>
                        <a href="mailto:someone@example.com" target="_blank" title='Send an Email' className={`${classes.iconCircle} ${classes.facebook}`}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a><br />
                        <a href="https://facebook.com" target="_blank" title='Go to Facebook' className={`${classes.iconCircle} ${classes.facebook}`}>
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a><br />
                        <a href="https://youtube.com" target="_blank" title='Go to Youtube' className={`${classes.iconCircle} ${classes.facebook}`}>
                            <FontAwesomeIcon icon={faYoutube} />
                        </a><br />
                    </div>
                    <div className={classes.footerBottom}>
                        <a href=" ">
                            <button className={classes.buttonFooter}>
                                <FontAwesomeIcon icon={faArrowUp} />&nbsp;
                                BACK TO TOP
                            </button>
                        </a>
                    </div>
                </div>
                <div className={classes.footerRight}>
                    <div className={classes.footerRightContainerLeft}>
                        <p className={classes.title}>Site Map</p>
                        <a className={classes.subcontent} href="/index.html">Home</a>
                        <a className={classes.subcontent} href="/about">About Us</a>
                        <a className={classes.subcontent} href="/help">Help</a>
                    </div>
                    <div className={classes.footerRightContainerRight}>
                        <p className={classes.title}>About LawBOT</p>
                        <a className={classes.subcontent} href="/index.html">Our Goal</a>
                        <a className={classes.subcontent} href="/index.html">Features</a>
                        <a className={classes.subcontent} href="/index.html">Security</a>
                    </div>
                </div>
            </footer>
            <div className={classes.footerCopyright}>
                <p>Copyright &copy; 2025, LawBOT. All Rights Reserved. Developed by Group 1.</p>
            </div>
        </div>
    );
}

export default Footer;