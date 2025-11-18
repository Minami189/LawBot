import classes from "./Summarize.module.css";
import { useState, useRef } from "react";
export default function Summarize(){
    const [content, setContent] = useState("yung reply ng lawbot dito nyan llitaw");
    const messageRef = useRef(null);
    function handleMessage(e){
        //para lang di magrefresh page
        e.preventDefault();
        const message = messageRef.current.value;
        messageRef.current.value = "";
        console.log(message);
    }

    return(
        <div className={classes.page}>

            <div className={classes.chat}>
                <h1>Employment Contract - Jordan Poole</h1>
                <div className={classes.chatContent}>{content}</div>
                {/*kaya lang ako gumamit form para mapress enter to send */}
                <form onSubmit={handleMessage}>
                    <input className={classes.chatInput} placeholder="Ask lawbot for tips" ref={messageRef}/>
                </form>
            </div>

            <div className={classes.chatSide}></div>
        </div>
    )
}