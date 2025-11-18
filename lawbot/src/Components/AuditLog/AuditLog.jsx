import classes from './AuditLog.module.css'

function AuditLog() {
  return (
    <div>
        <div className={classes.header}>
            <div className={classes.title}>
                <h1>Document History</h1>
                <h3>Access a complete timeline of your interactions with the AI from document uploads to generated summaries.</h3>
                <h3>Stay organized and in control of your legal research.</h3>
            </div>
            <div className={classes.input}>
                <div className={classes.search}>
                        <input type="text" />
                </div>
                <div className={classes.filter}>
                        <select name="" id="">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                </div>
            </div>
            <div className={classes.auditContainer}>
                nice
            </div>
        </div>

    </div>
  )
}

export default AuditLog