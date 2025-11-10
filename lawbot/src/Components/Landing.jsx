import classes from "../Styles/Landing.module.css"
import moralLady from '../assests/moralLady.png'
import hiwGraphic from '../assests/hiwGraphic.png'
import Navbar from "./Navbar";
import archive from '../assests/archive.png'
import flashlight from '../assests/flashlight.png'
import protection from '../assests/protection.png'
import { useEffect, useRef, useState } from "react";

function Landing() {
    

    return ( 
        <>
            <Navbar/>
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
                        <p className={`${classes.typing} ${classes.text}`}> Try it now.</p>
                    </div>
                </div>
            </section>

            <section className={classes.section}>
                <div className={classes.hiwTitle}>
                  <h1>One Goal, Simplify Law. 
                    Offer Transparency.</h1>
                </div>
                <div className={classes.hiw}>
                    <div className={classes.hiwImg}>
                        <img src={hiwGraphic} alt="robotgraphic" />
                    </div>
                    <div className={classes.hiwText}>
                        <p>LawBot bridges the gap between complex legal documents and 
                            everyday understanding. With advanced AI summarization, it 
                            transforms lengthy, jargon-filled files into clear, concise 
                            insights anyone can grasp. Whether you’re a student, a 
                            professional, or simply someone trying to make sense of a contract, LawBot gives you 
                            clarity, accuracy, and confidence - without needing a law degree.</p>
                    </div>
                </div>
            </section>

            <section className={classes.section}>
                <div className={classes.features}>
                    <h1>Your Legal Assistant in a Click</h1>
                    <div className={classes.featuresContainer}>
                        <div className={classes.feature}>
                            <img src={protection} alt="Secured Data Image" />
                            <h2>Secured Data</h2>
                            <p>Confidential documents  uploaded goes through data encryption.</p>
                        </div>

                        <div className={classes.feature}>
                            <img src={flashlight} alt="Highlight Image" />
                            <h2>Highlight</h2>
                            <p>Identifying key clauses, deadlines, and responsibilities.</p>
                        </div>

                        <div className={classes.feature}>
                            <img src={archive} alt="Archive Image" className={classes.flashlight}/>
                            <h2>Archive</h2>
                            <p>Access and revisit previous documents.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes.section}>
                <div className={classes.tutorial}>
                    <div className={classes.tutorialTitleContainer}>
                        <h1>From Upload to Insight.</h1>
                        <p>Here’s how LawBot simplifies your legal workflow.</p>
                    </div>

                    <div className={classes.tutorialPartsContainer} id={classes.tutorial}>
                        <div className={classes.tutorialLeft}>
                            <div className={classes.step} data-step="0">Upload</div>
                            <div className={classes.step} data-step="1">Summarize</div>
                            <div className={classes.step} data-step="2">Review</div>
                        </div>
                        <div className={classes.tutorialRight}>
                            <div className={classes.graphic} data-step="0">
                                <h1>Upload your files</h1>
                                <img src="" alt="" />
                                <p>Drag and drop or  files from your computer</p>
                            </div>
                            <div className={classes.graphic} data-step="1">
                                <h1>Upload your files</h1>
                                <img src="" alt="" />
                                <p>Drag and drop or  files from your computer</p>
                            </div>
                            <div className={classes.graphic} data-step="2">
                                <h1>Upload your files</h1>
                                <img src="" alt="" />
                                <p>Drag and drop or  files from your computer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
     );
}

export default Landing;