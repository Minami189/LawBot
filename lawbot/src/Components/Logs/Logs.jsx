import classes from "./Logs.module.css";
import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../Sidebar/Sidebar";

export default function Logs(){
    const [logs, setLogs] = useState([]);
    const [viewLogs, setViewLogs] = useState([]);
    const filterRef = useRef(null);
    const {userToken} = useContext(AppContext);


    useEffect(()=>{

        handleLogs();

    },[])

    async function handleLogs(){
        const fetchData = new FormData();
        const savedUserToken = localStorage.getItem("userInfo");
        let userEmail;
        if(savedUserToken){
            const decodedToken = jwtDecode(savedUserToken);
            userEmail = decodedToken.email;
        }else{
            userEmail= jwtDecode(userToken).email;
        }

        fetchData.append("userEmail", userEmail);

        const response = await fetch("http://localhost/backend/getLogs.php", {
            method:"POST",
            body:fetchData
        });

        const {message, success,} = await response.json();
        if(!success){
            console.error(message);
            return;
        }



        const fetchedLogs = message;
        console.log(fetchedLogs);
        setLogs(fetchedLogs);
        setViewLogs(fetchedLogs);
    }

    function handleSearch() {
        const keyword = filterRef.current.value.toLowerCase();

        const filtered = logs.filter(log =>
            Object.values(log).some(value =>
                value.toLowerCase().includes(keyword)
            )
        );

        setViewLogs(filtered);
        console.log(filtered);
    }

    function truncateDocument(name = "", maxLen = 30){
        if(name.length <= maxLen) return name;
        return `${name.slice(0, maxLen)}...`;
    }


    return(
        <div className={classes.page}>
            <Sidebar/>
            <div className={classes.container}>

                {/* Title */}
                <h1 className={classes.title}>Document History</h1>
                <p className={classes.subtitle}>
                    Access a complete timeline of your interactions with the AI from document uploads to generated summaries. 
                    Stay organized and in control of your legal research.
                </p>

                {/* Search + Filter */}
                <div className={classes.topControls}>
                    <input 
                        type="text" 
                        className={classes.search}
                        placeholder="filter by document, action, date"
                        onChange={handleSearch}
                        ref={filterRef}
                    />


                </div>

                {/* Table */}
                <div className={classes.table}>
                    <div className={classes.tableHeader}>
                        <span>Document</span>
                        <span>Action</span> 
                        <span>Date</span>
                    </div>

                    {
                        viewLogs.map((log)=>{
                            return(
                                <div className={classes.tableRow}>
                                    <div className={classes.docInfo}>
                                        <h3>{truncateDocument(log.document)}</h3>
                                    </div>
                                    <span>{log.action}</span>
                                    <span>{log.date}</span>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}