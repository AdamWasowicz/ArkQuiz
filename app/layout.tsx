import ReduxProvider from '@/src/redux/provider'
import type { Metadata } from 'next'
import React from 'react'
import '../src/styles/globals.scss'
import Footer from '@/src/components/footer/footer'
import Director from '@/src/components/director/director'
import Navigation from '@/src/components/navigation/navigation'

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

            <main>
              {children}
            </main>

            <Footer/>
          </Director>
        </ReduxProvider>
      </body>
    </html>
  )
}