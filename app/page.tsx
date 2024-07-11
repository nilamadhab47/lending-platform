import Image from 'next/image'
import { options } from './api/auth/[...nextauth]/option'
import { getServerSession } from 'next-auth/next'
import { redirect, useRouter } from 'next/navigation'


export default async function Home() {

  const session = await getServerSession(options)
  if (!session) {
    redirect('/auth/login')
  } else {
    redirect('/dashboard/account-receivable')
  }
}


