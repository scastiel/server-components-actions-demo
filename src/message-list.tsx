import { fetchMessages, formatDate } from '@/helpers'

export async function MessageList() {
  const messages = await fetchMessages()

  return (
    <>
      <h2>Last Messages</h2>
      {messages.length > 0 ? (
        messages.map(({ id, name, content, date }) => (
          <blockquote key={id}>
            <div>{content}</div>
            <small>{`–${name}, ${formatDate(date)}`}</small>
          </blockquote>
        ))
      ) : (
        <p>No message yet.</p>
      )}
    </>
  )
}
