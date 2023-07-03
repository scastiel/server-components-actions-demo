import { MessageFormV1 } from '@/v1/message-form'
import { MessageFormV2 } from '@/v2/message-form'
import { MessageList } from '@/message-list'
import { Suspense } from 'react'

export default function MessagesPage() {
  return (
    <>
      <MessageFormV2 />
      <Suspense fallback={<p>Loading messages…</p>}>
        <MessageList />
      </Suspense>
    </>
  )
}
