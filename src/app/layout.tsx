import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getCurrentUser } from './actions/auth' 

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Circulx ',
  description: 'Your one-stop shop for all your needs',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await getCurrentUser()
  
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header user={user} />
        
        
        {children}
        <Footer />
      </body>
    </html>
  )
}