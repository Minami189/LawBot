import classes from "./Logs.module.css";
import { useState, useRef, useEffect } from "react";


export default function Logs(){
    const [logs, setLogs] = useState([]);
    const [viewLogs, setViewLogs] = useState([]);
    const filterRef = useRef(null);

    useEffect(()=>{
        const fetchedLogs = [
            {
                document: "Employment Contract - Jordan Poole",
                action: "summarize",
                date: "11/5/2025 - 14:33"
            }
        ]

        setLogs(fetchedLogs);
        setViewLogs(fetchedLogs);
    },[])

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


    return(
        <div className={classes.page}>
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
                        placeholder="search document"
                        onChange={handleSearch}
                        ref={filterRef}
                    />

                    <button className={classes.filterBtn}>
                        filter actions
                    </button>
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
                                        <h3>{log.document}</h3>
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