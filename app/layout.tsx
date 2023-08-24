import ReduxProvider from '@/redux/provider'
import type { Metadata } from 'next'
import React from 'react'
import '../styles/globals.scss'
import Footer from '@/components/footer/footer'

export const metadata: Metadata = {
  title: 'ArkQuiz',
  description: 'Read README.md',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>

        <Footer/>
      </body>
    </html>
  )
}