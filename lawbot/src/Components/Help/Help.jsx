import classes from './Help.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer.jsx";
import { withBase } from "../../functions/withBase";
import bro from '../../assests/bro.png'
import support from '../../assests/support.png';

export default function Help() {
  return (
    <div className={classes.pageContainer}>
        <Navbar/>
        <section className={classes.Section}>
            <div className={classes.help}>
                <div className={classes.imageContainer}>
                    <img src={bro} alt="" className={classes.imageHelp}/>
                </div>
                <div className={classes.contentContainer}>
                    <h1>Help</h1>
                    <p>This space offers clear and practical guidance for anyone using the platform, ensuring every feature is
                    easy to understand and navigate. Users can find step-by-step instructions for uploading documents, viewing 
                    summaries, and interpreting key highlights without feeling overwhelmed. The goal is to provide straightforward 
                    support that removes confusion and builds confidence, allowing individuals of any background to use the tools effectively. 
                    Whether you're exploring the platform for the first time or returning with questions, this guidance helps you 
                    move forward with ease and clarity.</p>
                    <a href={withBase("/#home")}><p className={classes.button}>How Lawbot Works</p></a>
                </div>
            </div>
        </section>
          <section className={classes.Section}>
            <div className={classes.help}>
                <div className={classes.imageContainerMobile}>
                    <img src={support} alt="" className={classes.imageSupport}/>
                </div>
                <div className={classes.contentContainer}>
                    <h1>Contact Us</h1>
                    <p>This space offers clear and practical guidance for anyone using the platform, ensuring every feature is
                    easy to understand and navigate. Users can find step-by-step instructions for uploading documents, viewing 
                    summaries, and interpreting key highlights without feeling overwhelmed. The goal is to provide straightforward 
                    support that removes confusion and builds confidence, allowing individuals of any background to use the tools effectively. 
                    Whether you're exploring the platform for the first time or returning with questions, this guidance helps you 
                    move forward with ease and clarity.</p>
                    <a href="mailto:thedevelopers@lawbot.com?subject=Contact%20Us&body=Hello%2C%20I%20would%20like%20to%20get%20in%20touch."><p className={classes.button}>Contact Us</p></a>
                </div>
                <div className={classes.imageContainerDesktop}>
                    <img src={support} alt="" className={classes.imageSupport}/>
                </div>
            </div>
          </section>
          <Footer />
    </div>
  )
}
