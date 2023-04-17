import './globals.css'
import Nav from './components/Nav'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Hydrate from './components/Hydrate'
import { Montserrat } from "next/font/google"

//define main font

const montserrat = Montserrat({weight: ['400', '500', '700'], subsets:['latin']})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //fetch the user
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={`mx-64 ${montserrat.className}`}>
        <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string}/>
        {children}
        </Hydrate>
      </body>
    </html>
  )
}
