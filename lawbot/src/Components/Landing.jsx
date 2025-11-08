import classes from "../Styles/landing.module.css"
import moralLady from '../assests/moralLady.png'
import hiwGraphic from '../assests/hiwGraphic.png'
function Landing() {


    return ( 
        <div className={classes.landingPageContainer}>
            <section className={classes.section}>
                <div className={classes.hero}>
                    <img src={moralLady} alt="Moral Lady"></img>
                    <p className={classes.title}>
                        Summarize Legal Documents in Seconds.
                    </p>
                    <div className={classes.uploadBar}>
                        <p>Upload PNG / Text / PDF / Word Document</p>
                    </div>
                    <div className={`${classes.subtitle}`}>
                        <p className={classes.typing}> Try it now.</p>
                    </div>
                </div>
            </section>

            <section className={classes.section}>
                <div className={classes.hiw}>
                    <div className={classes.hiwImg}>
                        <img src={hiwGraphic} alt="robotgraphic" />
                    </div>
                    <div className={classes.hiwText}>
                        <h1>One Goal, Simplify Law. 
                            Offer Transparency.</h1>
                        <p>LawBot bridges the gap between complex legal documents and 
                            everyday understanding. With advanced AI summarization, it 
                            transforms lengthy, jargon-filled files into clear, concise 
                            insights anyone can grasp. Whether you’re a student, a 
                            professional, or simply someone trying to make sense of a contract, LawBot gives you 
                            clarity, accuracy, and confidence - without needing a law degree.</p>
                    </div>
                </div>
            </section>
        </div>
     );
}

export default Landing;