import classes from "./Popup.module.css";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../App";
import { jwtDecode } from "jwt-decode";
import { withBase } from "../../../functions/withBase";
import { useNavigate } from "react-router-dom";
export default function Popup({ onClose, loadStats }){
    const { userToken } = useContext(AppContext);
    const [files, setFiles] = useState([]);
    const [fileID, setFileID] = useState();
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        loadFiles();
    },[])
 
    async function loadFiles(){
        const formData = new FormData();
        const savedUserToken = localStorage.getItem("userInfo");
        let userEmail;
        if(savedUserToken){
            const decodedToken = jwtDecode(savedUserToken);
            userEmail = decodedToken.email;
        }else{
            userEmail= jwtDecode(userToken).email;
        }

        formData.append("userEmail", userEmail);
        
        const response = await fetch("http://localhost/backend/getFiles.php", {
            method:"POST",
            body: formData,
        });
        setEmail(userEmail);
        const {success, files} = await response.json();
        if(!success) return;
        setFiles(files);
    }

    async function handleSelectFile(fileID, index){
        setFileID(fileID);
        localStorage.removeItem("selectedFileID");
        localStorage.setItem("selectedFileID", fileID);
        
        const fetchData = new FormData();
        fetchData.append("new_chat", "placeholder");
        fetchData.append("title", `${files[index].filename} summary`);
        fetchData.append("userEmail", email);

        const response = await fetch("http://localhost/backend/chatbot.php", {
            method:"POST",
            body: fetchData
        });

        
        const {success, message} = await response.json();
        if(success){
            localStorage.removeItem("chatID");
            localStorage.setItem("chatID", message);
            localStorage.removeItem("summarizing");
            localStorage.setItem("summarizing", true);
            
            navigate(withBase("/summary"))
        }else{
            console.error(message);
        }
    }

    async function handleDeleteFile(e, fileId){
        e.stopPropagation();
        const savedUserToken = localStorage.getItem("userInfo");
        let userEmail;

        if(savedUserToken){
            const decodedToken = jwtDecode(savedUserToken);
            userEmail = decodedToken.email;
        }else{
            userEmail= jwtDecode(userToken).email;
        }

        const fetchData = new FormData();
        fetchData.append("fileID", fileId);
        fetchData.append("userEmail", userEmail);

        const response = await fetch("http://localhost/backend/deleteFile.php",{
            method: "POST",
            body: fetchData
        });

        setFiles((prev)=>prev.filter((f)=>f.id !== fileId));
        loadStats();
    }

    return(
        <div className={classes.popup}>
            <div className={classes.backdrop} onClick={onClose}></div>
            <div className={classes.modal}>
                <div className={classes.header}>
                    <h2>Document Actions</h2>
                    <button className={classes.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={classes.body}>
                    <p>click on a document to summarize it.</p>
                    <div className={classes.documentList}>
                        {files.map((file, index)=>{
                            return(
                                <h4 onClick={()=>handleSelectFile(file.id, index)} key={file.id ?? index}>
                                    <span className={classes.fileTitle}>{file.filename}</span>
                                    <button
                                        className={classes.deleteButton}
                                        onClick={(e)=>handleDeleteFile(e, file.id)}
                                        type="button"
                                    >
                                        Delete
                                    </button>
                                </h4>
                            )
                        })}
                    </div>
                </div>
                <div className={classes.actions}>
                    <button onClick={onClose} className={classes.primary}>Cancel</button>
                </div>
            </div>
        </div>
    )
}