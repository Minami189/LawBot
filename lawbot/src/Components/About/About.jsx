
import classes from "../About/About.module.css";
import aboutImg from "../../assests/aboutus/aboutUs.png";


export default function About(){
    return(
        <div className={classes.example}>
                <img src={aboutImg} alt="About Lawbot" className={classes.aboutImg} />
            <h1 className={classes.title}>THE SMART WAY OF MAKING DOCUMENTS 
                <br/>
                COMPLEX INFORMATION CLEAR AND
                <br/>
                EASY TO UNDERSTAND
            </h1>
            <p className={classes.description}>
                Welcome to Lawbot-your smart legal assistant. Our goal is to make the documents easier to understand for everyone. 
            </p>
            <p className={classes.description}>
                Lawbot helps you find information, answer legal questions, and guide you step-by-step using simple and clear explanations.
            </p>
            <p className={classes.description}>
                Whether you're a student, researcher, or just curious about AI that swiftly summarizes and analyzes legal documents,
            </p>
            <p className={classes.description}>
                making complex information clear and easy to understand, Lawbot is here to support and assist you anytime.
            </p>
        </div>
    )
}