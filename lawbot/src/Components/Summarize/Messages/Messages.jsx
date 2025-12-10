import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { isValidElement } from 'react'
import classes from './Messages.module.css'

const normalizeBotContent = (text = '') =>
  String(text).replace(/<br\s*\/?>/gi, '\n')

const markdownComponents = {
  table: ({ children }) => <table className={classes.table}>{children}</table>,
  ol: ({ start, children }) => <ol start={start}>{children}</ol>,
  hr: () => <hr className={classes.rule} />,
}

export default function Messages({ type = 'user', content = '', className = '' }) {
  const isUser = type === 'user'
  const wrapperClass = `${classes.messageContainer} ${classes[className] ?? ''}`
  const textClass = isUser ? classes.userText : classes.botText

  const renderContent = () => {
    if (isUser) return content
    if (isValidElement(content)) return content // handles ThreeDotsWave or other components

    const text = normalizeBotContent(content)
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={markdownComponents}
      >
        {text}
      </ReactMarkdown>
    )
  }

  return (
    <div className={wrapperClass}>
      <h5 className={isUser ? classes.userTitle : classes.botTitle}>{type}</h5>
      <div className={textClass}>{renderContent()}</div>
    </div>
  )
}
