import classes from './Messages.module.css'

export default function Messages({type="user", content="sample content", className=""}) {

  return (
    <div className={`${classes.messageContainer} classes.${className}`}>
        <h5 className={ type == "user" ? classes.userTitle : classes.botTitle}>{type}</h5>
        <div className={ type == "user" ? classes.userText : classes.botText}> {content}</div>
    </div>
  )
}
