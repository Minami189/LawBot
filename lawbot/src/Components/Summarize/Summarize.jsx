import classes from "./Summarize.module.css";
import { useState, useRef } from "react";
import Messages from "./Messages/Messages.jsx";
import ThreeDotsWave from "../../animations/ThreeDotsWave.jsx";
import { faL } from "@fortawesome/free-solid-svg-icons";
export default function Summarize(){
    const [content, setContent] = useState("yung reply ng lawbot dito nyan llitaw");
    const [loading, setLoading] = useState(false);
    const messageRef = useRef(null);

    function handleMessage(e){
        e.preventDefault();

         setLoading(true);
        const message = messageRef.current.value;
        messageRef.current.value = "";
        console.log(message);
    }

    const messages = [{
        title : "John Doe",
        messageID : 173
        },
        {
        title : "Banzel My Janzels",
        messageID : 174
        },
        {
        title : "Frenslee Cock Allegations",
        messageID : 175
        },
    ];



    return(
        <div className={classes.page}>

        
            <div className={classes.chat}>
                <h1>Employment Contract - Jordan Poole</h1>
                <div className={classes.chatContent}>
                    <Messages type="bot" content={<ThreeDotsWave/>}  className={loading ? classes.show : classes.hide}/>
                    <Messages type="bot" content="Takla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydana "/>
                    <Messages type="user" content="Takla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydanaTakla ku nung tatakla ku edi takla ku pa tanaydana "/>
                    <Messages type="bot" content="bulus"/>
                    <Messages type="user" content="bulus"/>
                    <Messages type="bot" content="bulus"/>
                    

                </div>
                {/*kaya lang ako gumamit form para mapress enter to send */}
                 
                <form onSubmit={handleMessage}>
                    <input className={classes.chatInput} placeholder="Ask lawbot for tips" ref={messageRef}/> 
                </form>
            </div>

             <div className={classes.chatsContainer}>

                {/* Sample Div for the chats */}
                <div className={classes.chatContainer} onClick={()=>{
                    
                }}>
                    <h1 className={classes.chatTitle}>Employment Contract</h1>
                </div>

                {/* Sample Div for the chats using objects and map*/}

                {messages.map(element => {
                        return(
                            <div 
                            key={element.messageID}
                            className={classes.chatContainer} 
                            onClick={()=>{
                                    console.log(element.messageID)
                                    }}> 
                            <h1 className={classes.chatTitle}>
                                {(element.title).length >= 23 ? (element.title).slice(0, 22) + "..." : element.title}
                            </h1>
                            </div>
                        );
                    })
                }

             </div>



        </div>
    )
}