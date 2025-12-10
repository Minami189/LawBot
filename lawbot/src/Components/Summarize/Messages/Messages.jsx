import { isValidElement } from 'react'
import classes from './Messages.module.css'

const normalizeBotContent = (text = '') =>
  String(text).replace(/<br\s*\/?>/gi, '\n')

const renderInline = (text = '') => {
  const parts = []
  const regex = /(\*\*|\*)([^*]+?)\1/g
  let lastIndex = 0
  let key = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const content = match[2]
    if (match[1] === '**') {
      parts.push(
        <strong key={`b-${key}`}>
          {content}
        </strong>,
      )
    } else {
      parts.push(
        <em key={`i-${key}`}>
          {content}
        </em>,
      )
    }

    key += 1
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

const renderCellContent = (cell = '') => {
  const normalized = normalizeBotContent(cell)
  const lines = normalized
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  const allOrdered = lines.length > 1 && lines.every((l) => /^\d+\.\s+/.test(l))
  if (allOrdered) {
    const start = parseInt(lines[0].match(/^(\d+)\./)?.[1] ?? '1', 10)
    const items = lines.map((l) => l.replace(/^\d+\.\s+/, ''))
    return (
      <ol start={start}>
        {items.map((item, idx) => (
          <li key={`cell-li-${idx}`}>{renderInline(item)}</li>
        ))}
      </ol>
    )
  }

  return renderInline(normalized)
}

const isTableSeparator = (line = '') =>
  /^-+:?-*$/.test(line.trim().replace(/\|/g, '').replace(/\s+/g, '-'))

const isLikelyTableHeader = (line = '') => line.includes('|')

const parseTable = (lines, startIndex) => {
  const header = lines[startIndex]
  const separator = lines[startIndex + 1]

  if (!isLikelyTableHeader(header) || !isTableSeparator(separator)) return null

  const tableLines = []
  let i = startIndex + 2
  while (i < lines.length && lines[i].includes('|')) {
    tableLines.push(lines[i])
    i += 1
  }

  const splitRow = (line) =>
    line
      .split('|')
      .map((cell) => cell.trim())
      .filter((cell) => cell.length > 0)

  const headers = splitRow(header)
  const rows = tableLines.map(splitRow)

  return {
    nextIndex: i,
    element: (
      <table key={`tbl-${startIndex}`} className={classes.table}>
        <thead>
          <tr>
            {headers.map((cell, idx) => (
              <th key={`th-${idx}`}>{renderCellContent(cell)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={`tr-${rIdx}`}>
              {row.map((cell, cIdx) => (
                <td key={`td-${rIdx}-${cIdx}`}>{renderCellContent(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
  }
}

const renderBotContent = (rawText = '') => {
  const lines = normalizeBotContent(rawText).split('\n')
  const parts = []
  let buffer = []
  let i = 0

  const flushBuffer = () => {
    if (buffer.length === 0) return
    const text = buffer.join('\n')
    const inlineParts = text.split('\n').flatMap((line, idx) =>
      idx === 0 ? renderInline(line) : [<br key={`brp-${idx}`} />, ...renderInline(line)],
    )
    parts.push(<p key={`p-${parts.length}`}>{inlineParts}</p>)
    buffer = []
  }

  while (i < lines.length) {
    const tableCandidate = parseTable(lines, i)
    if (tableCandidate) {
      flushBuffer()
      parts.push(tableCandidate.element)
      i = tableCandidate.nextIndex
      continue
    }

    const headingMatch = lines[i].match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      flushBuffer()
      const level = Math.min(headingMatch[1].length, 6)
      const HeadingTag = `h${level}`
      parts.push(
        <HeadingTag key={`h-${parts.length}`}>{renderInline(headingMatch[2].trim())}</HeadingTag>,
      )
      i += 1
      continue
    }

    const orderedMatch = lines[i].match(/^(\d+)\.\s+(.*)$/)
    if (orderedMatch) {
      flushBuffer()
      const items = []
      const startNumber = parseInt(orderedMatch[1], 10) || 1
      while (i < lines.length) {
        const m = lines[i].match(/^(\d+)\.\s+(.*)$/)
        if (!m) break
        items.push(m[2])
        i += 1
      }
      parts.push(
        <ol key={`ol-${parts.length}`} start={startNumber}>
          {items.map((item, idx) => (
            <li key={`li-${idx}`}>{renderInline(item)}</li>
          ))}
        </ol>,
      )
      continue
    }

    if (/^-{3,}\s*$/.test(lines[i])) {
      flushBuffer()
      parts.push(<hr key={`hr-${parts.length}`} />)
      i += 1
      continue
    }

    buffer.push(lines[i])
    i += 1
  }

  flushBuffer()
  return parts
}

export default function Messages({ type = 'user', content = '', className = '' }) {
  const isUser = type === 'user'
  const wrapperClass = `${classes.messageContainer} ${classes[className] ?? ''}`
  const textClass = isUser ? classes.userText : classes.botText

  const renderContent = () => {
    if (isUser) return content
    if (isValidElement(content)) return content
    return renderBotContent(content)
  }

  return (
    <div className={wrapperClass}>
      <h5 className={isUser ? classes.userTitle : classes.botTitle}>{type}</h5>
      <div className={textClass}>{renderContent()}</div>
    </div>
  )
}
