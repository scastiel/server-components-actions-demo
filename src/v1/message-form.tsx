import { formDataSchema, postMessage } from '@/helpers'
import { revalidatePath } from 'next/cache'

async function submitMessageForm(formData: FormData) {
  'use server'

  const message = formDataSchema.parse({
    content: formData.get('content'),
    name: formData.get('name'),
  })

  await postMessage(message)
  revalidatePath('/')
}

export function MessageFormV1() {
  return (
    <form action={submitMessageForm}>
      <h2>New Message (v1)</h2>
      <label htmlFor="name">Your name:</label>
      <input type="text" id="name" name="name" required minLength={3} />
      <label htmlFor="content">Your message:</label>
      <textarea id="content" name="content" required minLength={3} />
      <button type="submit">Send</button>
    </form>
  )
}
