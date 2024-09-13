import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'

import Image from 'next/image'

export default function Home() {
  return (
    <>
      <UserButton></UserButton>
      <h1>Home PagDe</h1>
      <a href='/dashboard'>fWSQS</a>
    </>
    
  )
}
