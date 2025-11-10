import classes from "../Styles/Landing.module.css"
import moralLady from '../assests/Landing/moralLady.png'
import hiwGraphic from '../assests/Landing/hiwGraphic.png'
import Navbar from "./Navbar";
import archive from '../assests/Landing/archive.png'
import flashlight from '../assests/Landing/flashlight.png'
import protection from '../assests/Landing/protection.png'
import upload from '../assests/Landing/Upload.png';
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./animations/Reveal.tsx";

function Landing() {
    const [count, setCount] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    const steps = ["Upload", "Summarize", "Review"];
    const graphics = [
    {
      title: "Upload your files",
      desc: "Drag and drop or select files from your computer.",
      img: upload, // insert your image path
    },
    {
      title: "Summarize",
      desc: "AI automatically extracts key clauses and insights.",
      img: "",
    },
    {
      title: "Review",
      desc: "Check the summarized document and export or save.",
      img: "",
    },
    ];
    return ( 
        <>
            <Navbar/>
            <section className={classes.section}>
                <div className={classes.hero}>
                    <Reveal>
                        <img src={moralLady} alt="Moral Lady"></img>
                    </Reveal>
                    <Reveal>
                    <p className={classes.title}>
                        Summarize Legal Documents in Seconds.
                    </p>
                    </Reveal>
                    <Reveal>
                    <div className={classes.uploadBar}>
                        <p>Upload PNG / Text / PDF / Word Document</p>
                    </div>
                    </Reveal>
                    <div className={`${classes.subtitle}`}>
                        <p className={`${classes.typing} ${classes.text}`}> Try it now.</p>
                    </div>
                </div>
            </section>

            <section className={classes.section}>
                <div className={classes.hiwContainer}>
                    <Reveal>
                    <div className={classes.hiwTitle}>
                    <h1>One Goal, Simplify Law. 
                        Offer Transparency.</h1>
                    </div>
                    </Reveal>
                    <div className={classes.hiw}>
                        <div className={classes.hiwImg}>
                            <Reveal>
                            <img src={hiwGraphic} alt="robotgraphic" />
                            </Reveal>
                        </div>
                        <div className={classes.hiwText}>
                            <Reveal>
                            <p>LawBot bridges the gap between complex legal documents and 
                                everyday understanding. With advanced AI summarization, it 
                                transforms lengthy, jargon-filled files into clear, concise 
                                insights anyone can grasp. Whether you’re a student, a 
                                professional, or simply someone trying to make sense of a contract, LawBot gives you 
                                clarity, accuracy, and confidence - without needing a law degree.</p>
                            </Reveal>
                        </div>
                    </div>
                 </div>
            </section>

            <section className={classes.section}>
                <div className={classes.features}>
                    <Reveal width="100%">
                    <h1>Your Legal Assistant in a Click</h1>
                    </Reveal>
                    <Reveal width="100%">
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
                    </Reveal>
                </div>
                
            </section>

            <section className={classes.section}>
                <div className={classes.tutorial}>
                    <div className={classes.tutorialTitleContainer}>
                        <Reveal>
                        <h1 className={classes.tutorialTitle}>From Upload to Insight.</h1>
                        </Reveal>
                        <Reveal>
                        <p className={classes.tutorialSubtitle}>Here’s how LawBot simplifies your legal workflow.</p>
                        </Reveal>
                    </div>

                    <div className={classes.tutorialPartsContainer} id={classes.tutorial}>

                       
                        <div className={classes.tutorialLeft}>
                        <Reveal width="100%">
                        {steps.map((step, i) => (
                            <motion.div
                            key={i}
                            className={classes.step}
                            data-step={i}
                            animate={{
                                color: activeStep === i ? "var(--textcolor)"  : "var(--tertiarycolor)" ,
                                opacity: activeStep === i ? 1 : 0.6,
                                scale: activeStep === i ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.5 }}
                            onClick={() => setActiveStep(i)}
                            >
                            {step}
                            </motion.div>
                        ))}
                         </Reveal>
                        </div>
                        
                       
                        <div className={classes.tutorialRight}>        
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    className={classes.graphic}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{
                                    duration: 0.9,
                                    ease: [0.42, 0, 0.58, 1], // cubic-bezier easing: slow start, fast middle, slow end
                                    }}
                                >
                                    <h1>{graphics[activeStep].title}</h1>
                                    <img src={graphics[activeStep].img} alt="" />
                                    <p>{graphics[activeStep].desc}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className={classes.section}>
                <div className={classes.security}>
                    <Reveal width="100%">
                        <div className={classes.securityTitleContainer}>
                            <h1>Confidentiality Is Our Priority</h1>
                            <p>Lawbot utilizes different types of security measurements to ensure proper encryption 
                            of your data while delivering fast and reliable services</p>
                        </div>
                   
                    </Reveal>
                    <Reveal width="100%">
                    <div className={classes.securityFeaturesContainer}>
                        <div className={classes.securityFeature}>
                            <h2>HTTPS</h2>
                            <p>secure data transfer.</p>
                        </div>

                        <div className={classes.securityFeature}>
                            <h2>AES-256</h2>
                            <p>Ensured encryption for stored files.</p>
                        </div>

                        <div className={classes.securityFeature}>
                            <h2>Auto-Deletion</h2>
                            <p>Documents auto-delete after 24 hours.</p>
                        </div>
                        <div className={classes.securityFeature}>
                            <h2>Independence</h2>
                            <p>No third-party data sharing.</p>
                        </div>
                    </div>
                    </Reveal>
                </div>
                
            </section>

             <section className={classes.section}>
                <div className={classes.cta}>
                    <Reveal>
                        <img src={moralLady} alt="Moral Lady"></img>
                    </Reveal>
                    <Reveal>
                    <p className={classes.title}>
                       Ready to simplify your legal documents?.
                    </p>
                    </Reveal>
                    <Reveal>
                    <div className={classes.tryNowContainer}>
                            <button className={classes.tryNowButton}>Get Started For Free</button>
                    </div>
                    </Reveal>
                </div>
            </section>

        </>
     );
}

export default Landing;