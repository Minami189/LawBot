import classes from "./About.module.css";
import aboutImg from "../../assests/aboutus/AboutUs.png"
import target from "../../assests/aboutus/target.png"
import warning from "../../assests/aboutus/warning.png"
import diamond from "../../assests/aboutus/diamond.png"
import Navbar from "../../Navbar/Navbar";


export default function About(){
    return(
        <div className={classes.example}>
        <Navbar/>
            <section className={classes.aboutSection}>
            <div className={classes.page}>
                <div className={classes.imgContainer}>
            <img src={aboutImg} alt="About Lawbot" className={classes.aboutImg} />
            </div>
        </div>
        <h1 className={classes.title}>
            THE SMART WAY OF MAKING COMPLEX <br/>
            DOCUMENTS CLEAR AND EASY TO UNDERSTAND
        </h1>
        <p className={classes.description}>
             Welcome to Lawbot-your smart legal assistant. Our goal is to make the 
             documents easier to understand for everyone. Lawbot helps you find 
             information, answer legal questions, and guide you step-by-step using 
             simple and clear explanations. Whether you're a student, researcher, 
             or simply curious about AI that swiftly summarizes and analyzes legal 
             documents, Lawbot is here to support and assist you anytime.
        </p>
        <h1 className={classes.exploreAbout}>
            EXPLORE MORE ABOUT LAWBOT
        </h1>
        <div className={classes.cardContainer}>
            <div className={classes.card}>
                <img src={target} alt="Mission" className={classes.cardIcon} />
                <h2 className={classes.cardTitle}>Our Mission</h2>
                    <p className={classes.cardText}>
                        To simplify complex legal legal language and everyday understanding
                        for everyone, anytime.
                    </p>
                <button onClick={() => window.location.href = "/mission"} className={classes.button}>Mission</button>
            </div>
         <div className={classes.card}>
            <img src={warning} alt="Vision" className={classes.cardIcon} />
                <h2 className={classes.cardTitle}>Our Limitation</h2>
                    <p className={classes.cardText}>
                        To responsibly advance AI-driven legal assistance while acknowledging its boundaries, 
                        this application is not intended to replace professional legal advice.
                    </p>
                <button onClick={() => window.location.href = "/limitation"} className={classes.button}>Limitation</button>
            </div>
         <div className={classes.card}>
            <img src={diamond} alt="Values" className={classes.cardIcon} />
                <h2 className={classes.cardTitle}>Our Values</h2>
                    <p className={classes.cardText}>
                        We value transparency, accuracy, and user-friendly design. Your 
                        feedback helps us grow and improve every day.
                    </p>
                <button onClick={() => window.location.href = "/feedback"} className={classes.button}>Feedback</button>
                </div>
            </div>
          <div className={classes.missionText}>
              
          </div>
        </section>
    </div>
 )
}