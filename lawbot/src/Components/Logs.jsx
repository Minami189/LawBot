import classes from "../Styles/logs.module.css";

export default function Logs(){
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
                        <span>Status</span>
                    </div>

                    {/* ITEM 1 */}
                    <div className={classes.tableRow}>
                        <div className={classes.docInfo}>
                            <h3>Employment Contract – Jordan Poole</h3>
                            <p>Legal employment agreement with terms and conditions</p>
                        </div>
                        <span>Summarize</span>
                        <span>11/5/2025 – 14:33</span>
                        <span className={`${classes.status} ${classes.processing}`}>Processing...</span>
                    </div>

                    {/* ITEM 2 */}
                    <div className={classes.tableRow}>
                        <div className={classes.docInfo}>
                            <h3>Employment Contract – Jordan Poole</h3>
                            <p>Legal employment agreement with terms and conditions</p>
                        </div>
                        <span>Upload</span>
                        <span>11/5/2025 – 14:20</span>
                        <span className={`${classes.status} ${classes.success}`}>Success</span>
                    </div>

                    {/* ITEM 3 */}
                    <div className={classes.tableRow}>
                        <div className={classes.docInfo}>
                            <h3>Employment Contract – Jordan Poole</h3>
                            <p>Legal employment agreement with terms and conditions</p>
                        </div>
                        <span>Summarize</span>
                        <span>9/4/2025 – 10:54</span>
                        <span className={`${classes.status} ${classes.failed}`}>Failed</span>
                    </div>

                    {/* ITEM 4 */}
                    <div className={classes.tableRow}>
                        <div className={classes.docInfo}>
                            <h3>Employment Contract – Jordan Poole</h3>
                            <p>Legal employment agreement with terms and conditions</p>
                        </div>
                        <span>Upload</span>
                        <span>9/2/2025 – 9:46</span>
                        <span className={`${classes.status} ${classes.success}`}>Success</span>
                    </div>

                </div>
            </div>
        </div>
    )
}