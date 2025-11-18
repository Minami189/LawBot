import classes from "./Popup.module.css";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../App";
import { jwtDecode } from "jwt-decode";
import { withBase } from "../../../functions/withBase";
import { useNavigate } from "react-router-dom";
export default function Popup({ onClose }){
    const { userToken } = useContext(AppContext);
    const [files, setFiles] = useState([]);
    const [fileID, setFileID] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        loadFiles();
    },[])


    async function loadFiles(){
        const formData = new FormData();
        let userEmail;
        const savedUserToken = localStorage.getItem("userInfo");

        if(savedUserToken){
            const decodedToken = jwtDecode(savedUserToken);
            userEmail = decodedToken.email;
        }else{
            userEmail = jwtDecode(userToken).email;
        }

        formData.append("userEmail", userEmail);
        
        const response = await fetch("http://localhost/backend/getFiles.php", {
            method:"POST",
            body: formData,
        });

        const {success, files} = await response.json();
        if(!success) return;
        setFiles(files);
    }

    function handleSelectFile(fileID){
        setFileID(fileID);
        localStorage.removeItem("selectedFileID");
        localStorage.setItem("selectedFileID", fileID);
        navigate(withBase("/summary"));
    }

    return(
        <div className={classes.popup}>
            <div className={classes.backdrop} onClick={onClose}></div>
            <div className={classes.modal}>
                <div className={classes.header}>
                    <h2>Summarize Document</h2>
                    <button className={classes.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={classes.body}>
                    <p>pick a document to summarize.</p>
                    <div className={classes.documentList}>
                        {
                            files.map((file, index)=>{
                                return(
                                    <h4 onClick={()=>handleSelectFile(file.id)} key={index}>{file.filename}</h4>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={classes.actions}>
                    <button onClick={onClose} className={classes.primary}>Cancel</button>
                </div>
            </div>
        </div>
    )
}