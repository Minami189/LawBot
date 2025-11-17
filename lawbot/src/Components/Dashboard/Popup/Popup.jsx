import classes from "./Popup.module.css";

export default function Popup({ onClose }){
    return(
        <div className={classes.popup}>
            <div className={classes.backdrop} onClick={onClose}></div>
            <div className={classes.modal}>
                <div className={classes.header}>
                    <h2>Summarize Document</h2>
                    <button className={classes.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={classes.body}>
                    <p>Upload or pick a document to summarize.</p>
                </div>
                <div className={classes.actions}>
                    <button onClick={onClose}>Cancel</button>
                    <button className={classes.primary}>Summarize</button>
                </div>
            </div>
        </div>
    )
}