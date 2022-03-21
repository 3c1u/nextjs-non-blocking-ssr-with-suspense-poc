import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="p-6">
      <Head>
        <title>Hoge App</title>
      </Head>
      <h1 className="text-2xl font-bold">It works!</h1>
      <div className="mt-4">
        <Link href="/posts" shallow>
          <a className="text-blue-500 underline hover:no-underline">
            Go to posts
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Home
