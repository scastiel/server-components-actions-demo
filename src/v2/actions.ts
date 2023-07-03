'use server'

import { MessageFormData, formDataSchema, postMessage } from '@/helpers'
import { revalidatePath } from 'next/cache'

export async function submitMessageForm(formData: MessageFormData) {
  formDataSchema.parse(formData)
  await postMessage(formData)
  revalidatePath('/')
}
