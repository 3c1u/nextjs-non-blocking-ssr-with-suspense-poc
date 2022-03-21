import type { AppProps } from 'next/app'
import { Suspense } from 'react'
import 'tailwindcss/tailwind.css'
import { PageWithSkeleton } from '~/types/pageWithSkeleton'

function MyApp({ Component, pageProps }: AppProps) {
  const Skeleton = (Component as PageWithSkeleton).skeleton

  return (
    <Suspense fallback={!!Skeleton && <Skeleton />}>
      <Component {...pageProps} />
    </Suspense>
  )
}

export default MyApp
