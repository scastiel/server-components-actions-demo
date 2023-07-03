'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageFormData, formDataSchema } from '@/helpers'
import { submitMessageForm } from '@/v2/actions'

export function MessageFormV2() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<MessageFormData>({
    shouldUseNativeValidation: true,
    resolver: zodResolver(formDataSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await submitMessageForm(data)
        reset()
      })}
    >
      <h2>New Message (v2)</h2>
      <label htmlFor="name">Your name:</label>
      <input type="text" id="name" {...register('name')} />
      <label htmlFor="content">Your message:</label>
      <textarea id="content" {...register('content')} />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}
