import classes from "./Summarize.module.css";
import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../App.jsx";
import Messages from "./Messages/Messages.jsx";
import ThreeDotsWave from "../../animations/ThreeDotsWave.jsx";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode"; 

export default function Summarize(){
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const [chatID, setChatID] = useState();
    const [title, setTitle] = useState();
    const { userToken } = useContext(AppContext);
    const messageRef = useRef(null);
    const bottomRef = useRef(null);

    async function handleMessage(e){
        e.preventDefault();
        const msg = messageRef.current.value;
        messageRef.current.value = "";
        const savedUserToken = localStorage.getItem("userInfo");
        let userEmail;
        if(savedUserToken){
            const decodedToken = jwtDecode(savedUserToken);
            userEmail = decodedToken.email;
        }else{
            userEmail= jwtDecode(userToken).email;
        }

        const fetchData = new FormData();

        setMessages((prev)=>[...prev,{type: "user", content: msg}]);
        setMessages(prev=>[...prev,{
            content:  <ThreeDotsWave/>,
            type: ""
        }]);
        
        fetchData.append("user_input", msg);
        fetchData.append("userEmail", userEmail);
        
        const response = await fetch("http://localhost/backend/chatbot.php", {
            method:"POST",
            body: fetchData
        })

        const {success, messages} = await response.json();
        if(success){
            console.log(messages);
            setMessages(messages);
        }else{
            console.error("error in the server");
        }
    }

    async function loadChats(){
        setChatID();
        const decoded = jwtDecode(localStorage.getItem("userInfo"));  
        let userEmail = decoded.email;
        const fetchData = new FormData();

        fetchData.append("userEmail", userEmail);

        const response = await fetch("http://localhost/backend/getChats.php",{
            method: "POST",
            body: fetchData
        });
        const {success, message, chats} = await response.json();
        if(success){
            console.log(message);
            setChats(chats);
        }else{
            console.error(message);
        }

        if(localStorage.getItem("chatID")){
            const chatID = localStorage.getItem("chatID");
            const chat = chats.find((value)=> value.id = chatID);
            setTitle(chat.title);
            console.log("title", chat);
        } 
    }

    async function getSummarize(){
        
        if(!localStorage.getItem("summarizing")){
            return;
        }
        
        setMessages(prev=>[{
            content:  <ThreeDotsWave/>,
            type: ""
        }]);

        const fetchData = new FormData();
        fetchData.append("chatID", localStorage.getItem("chatID"));
        fetchData.append("fileID", localStorage.getItem("selectedFileID"));
        
        
        const response = await fetch("http://localhost/backend/summarize.php",{
            method:"POST",
            body: fetchData,
        });
        
        const {success, message} = await response.json();
        if(success){
            setMessages((prev)=> [...prev, message]);
        }else{
            console.error(message);
        }
        localStorage.removeItem("summarizing");
        loadMessages();
        
    }

    async function loadMessages(){
        if(localStorage.getItem("summarizing")) return;

        const fetchData = new FormData();
        fetchData.append("chatID", localStorage.getItem("chatID"));
        
        const response = await fetch("http://localhost/backend/getMessages.php",{
            method:"POST",
            body: fetchData
        })

        const {success, message} = await response.json();
        if(success){
            console.log("message");
            setMessages(message);
        }else{
            console.error(message);
        }
    }

    async function handleSelectChat(chatID){
        localStorage.setItem("chatID", chatID);
        loadMessages();
    }

    const hasRun = useRef(false);
    useEffect(() => {
        if (!hasRun.current) {
            hasRun.current = true;
            getSummarize();
        }
    }, []);

    useEffect(()=>{
        loadMessages();
        loadChats();
    },[]);

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return(
        <div className={classes.page}>

        
            <div className={classes.chat}>
                <h1>{title}</h1>
                <div className={classes.chatContent}>
                    {
                        messages.map((message)=>{
                            return(
                                <Messages content={message.content} type={message.type}/>
                            )
                        })
                    }
                    <div ref={bottomRef}/>                  
                </div>
                {/*kaya lang ako gumamit form para mapress enter to send */}
                 
                <form onSubmit={handleMessage}>
                    <input className={classes.chatInput} placeholder="Ask lawbot for tips" ref={messageRef}/> 
                </form>
            </div>

             <div className={classes.chatsContainer}>



                {
                
                chats.map((element) => {
                        return(
                            <div key={element.id} className={classes.chatContainer} 

                                onClick={()=>{
                                    handleSelectChat(element.id);
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