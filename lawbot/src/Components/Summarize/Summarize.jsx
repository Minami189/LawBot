import classes from "./Summarize.module.css";
import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../App.jsx";
import Messages from "./Messages/Messages.jsx";
import ThreeDotsWave from "../../animations/ThreeDotsWave.jsx";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode"; 
import Sidebar from "../Sidebar/Sidebar.jsx";

export default function Summarize(){
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const [chatID, setChatID] = useState(null);
    const [title, setTitle] = useState('');
    const [suppressHoverId, setSuppressHoverId] = useState(null);
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
        loadChats();
    }

    async function loadChats(){
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
            return;
        }

        const storedChatId = localStorage.getItem("chatID");
        const initialChatId = storedChatId ?? (chats[0]?.id ?? null);

        if (initialChatId) {
            const initialChat = chats.find((value)=> String(value.id) === String(initialChatId));
            if (initialChat) {
                setChatID(initialChat.id);
                setTitle(initialChat.title);
                localStorage.setItem("chatID", initialChat.id);
                loadMessages(initialChat.id);
            }
        }
    }

    async function getSummarize(){
        
        if(!localStorage.getItem("summarizing")){
            return;
        }

        const savedUserToken = localStorage.getItem("userInfo");
        let userEmail;
        if(savedUserToken){
            const decodedToken = jwtDecode(savedUserToken);
            userEmail = decodedToken.email;
        }else{
            userEmail= jwtDecode(userToken).email;
        }
        
        setMessages(prev=>[{
            content:  <ThreeDotsWave/>,
            type: ""
        }]);

        const fetchData = new FormData();
        fetchData.append("chatID", localStorage.getItem("chatID"));
        fetchData.append("fileID", localStorage.getItem("selectedFileID"));
        fetchData.append("userEmail", userEmail);
        
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

    async function loadMessages(activeChatId){
        const targetChatId = activeChatId ?? localStorage.getItem("chatID");
        if(!targetChatId) return;
        if(localStorage.getItem("summarizing")) return;

        const fetchData = new FormData();
        fetchData.append("chatID", targetChatId);
        
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

    async function handleSelectChat(nextChatId){
        if(!nextChatId) return;
        localStorage.setItem("chatID", nextChatId);
        setChatID(nextChatId);
        const nextChat = chats.find((value)=> String(value.id) === String(nextChatId));
        setTitle(nextChat?.title ?? '');
        loadMessages(nextChatId);
    }

    async function handleDeleteChat(e, chatId){
        e.stopPropagation();

        const fetchData = new FormData();
        fetchData.append("chatID", chatId);
        const response = await fetch("http://localhost/backend/deleteChat.php", {
            method:"POST", 
            body: fetchData
        })

        const {success, message} = await response.json();
        if(!success){
            console.error(message);
            return;
        }
        
        localStorage.removeItem("chatID")
        setTitle("New Chat")
        setMessages([]);
        loadChats();
    }

    async function handleCreateChat(){
        const savedUserToken = localStorage.getItem("userInfo");
        let userEmail;
        if(savedUserToken){
            const decodedToken = jwtDecode(savedUserToken);
            userEmail = decodedToken.email;
        }else{
            userEmail= jwtDecode(userToken).email;
        }

        const fetchData = new FormData();
        fetchData.append("new_chat", "1");
        fetchData.append("title", "New Chat");
        fetchData.append("userEmail", userEmail);

        const response = await fetch("http://localhost/backend/chatbot.php", {
            method:"POST",
            body: fetchData
        });

        const {success, message} = await response.json();
        if(!success){
            console.error(message);
            return;
        }

        localStorage.setItem("chatID", message);
        setChatID(message);
        setTitle("New Chat");
        await loadChats();
        await loadMessages(message);
    }

    async function newChat(){
        if(localStorage.getItem("chatID")){
            return;
        }

        setTitle("New Chat");
    }

    const hasRun = useRef(false);
    useEffect(() => {
        if (!hasRun.current) {
            hasRun.current = true;
            getSummarize();
            newChat();
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
            <Sidebar/>
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
                    <p className={classes.chatListTitle}>Chat History</p>
                    <button
                        type="button"
                        className={classes.newChatBtn}
                        onClick={handleCreateChat}
                    >
                        + New Chat
                    </button>

                {
                
                chats.map((element) => {
                        return(
                            <div key={element.id} className={`${classes.chatContainer} ${suppressHoverId === element.id ? classes.chatContainerNoHover : ""}`} 

                                onClick={()=>{
                                    handleSelectChat(element.id);
                                }}> 

                                <h1 className={classes.chatTitle}>
                                    {(element.title).length >= 23 ? (element.title).slice(0, 22) + "..." : element.title}
                                </h1>
                                <button
                                    type="button"
                                    className={classes.closeChatBtn}
                                    onClick={(e)=>handleDeleteChat(e, element.id)}
                                    onMouseEnter={()=>setSuppressHoverId(element.id)}
                                    onMouseLeave={()=>setSuppressHoverId(null)}
                                    aria-label="Delete chat"
                                >
                                    ×
                                </button>
                            </div>
                        );
                    })
                }

             </div>



        </div>
    )
}