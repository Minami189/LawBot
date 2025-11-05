import classes from "../Styles/landing.module.css"
import moralLady from '../assests/moralLady.png'
function Landing() {

    return ( 
        <div className={classes.landingPageContainer}>
            <div className={classes.hero}>
                <img src={moralLady} alt="Moral Lady"></img>
                <p className={classes.title}>
                    Summarize Legal Documents in Seconds.
                </p>
                <div className={classes.uploadBar}>
                    <p>Upload PNG / Text / PDF / Word Document</p>
                </div>
                <div className={classes.subtitle}>
                    <p> Try it now.</p>
                </div>
            </div>

    
        </div>
     );
}

export default Landing;