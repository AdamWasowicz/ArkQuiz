import ReduxProvider from '@/redux/provider'
import type { Metadata } from 'next'
import React from 'react'
import '../styles/globals.scss'
import Footer from '@/components/footer/footer'
import Director from '@/components/director/director'
import Navigation from '@/components/navigation/navigation'

export const metadata: Metadata = {
  title: 'ArkQuiz',
  description: 'Read README.md',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Director>
            <Navigation/>

            {children}

            <Footer/>
          </Director>
        </ReduxProvider>
      </body>
    </html>
  )
}