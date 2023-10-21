import { Inter } from 'next/font/google'
import Events from './events'
import ErrorBoundary from '../components/errorBoundary'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Event Management App - Rahad</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`calendar-container mx-auto ${inter.className}`}>
        <ErrorBoundary>
          <Events />
        </ErrorBoundary>
      </main>
    </>
  )
}
