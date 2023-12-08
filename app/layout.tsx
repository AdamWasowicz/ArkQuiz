import ReduxProvider from '@/src/redux/provider';
import type { Metadata } from 'next';
import React from 'react';
import '../src/styles/globals.scss';
import '../src/styles/helper-classes.scss';
import Footer from '@/src/components/ui/footer/footer';
import Director from '@/src/components/other/director/director';
import Navigation from '@/src/components/ui/navigation/navigation';
// FontAwesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Arkquiz',
  description: 'Read README.md',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Director>
            <Navigation/>

            <main id="mainContent">{ children }</main>

            <Footer/>
          </Director>
        </ReduxProvider>
      </body>
    </html>
  )
}