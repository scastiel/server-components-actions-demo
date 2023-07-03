import { kv } from '@vercel/kv'
import { randomUUID } from 'crypto'
import z from 'zod'

const messagesSchema = z.array(
  z.object({
    id: z.string(),
    date: z
      .string()
      .datetime()
      .transform((d) => new Date(d)),
    name: z.string(),
    content: z.string(),
  })
)

type Message = z.infer<typeof messagesSchema>

export async function fetchMessages(): Promise<Message> {
  // await delay(1000)
  const messages = await kv.lrange('messages', 0, 10)
  return messagesSchema.parse(messages ?? [])
}

export async function postMessage(message: MessageFormData): Promise<void> {
  // await delay(1000)
  await kv.lpush('messages', {
    id: randomUUID(),
    date: new Date().toISOString(),
    name: message.name,
    content: message.content,
  })
}

export const formDataSchema = z.object({
  name: z
    .string()
    .min(3, 'Please enter a name of at least 3 characters.')
    .max(50, 'Please enter at most 50 characters.'),
  content: z
    .string()
    .min(3, 'Please enter a message of at least 3 characters.')
    .max(500, 'Please enter at most 500 characters.'),
})

export type MessageFormData = z.infer<typeof formDataSchema>

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export function formatDate(date: Date) {
  return date.toLocaleString('en-CA', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
}
