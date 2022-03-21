import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import {
  PageWithSkeleton,
  withSkeletonFallback,
} from '~/types/pageWithSkeleton'

type Posts = { id: number; title: string; content: string }[]

interface PageProps {
  posts?: Posts
}

const PostSkeleton = () => (
  <div className="mt-4 flex animate-pulse flex-col first:mt-0">
    <div className="my-1 h-6 w-64 max-w-[80%] bg-gray-200" />
    <div className="my-1 h-4 bg-gray-200" />
    <div className="my-1 h-4 bg-gray-200" />
    <div className="my-1 h-4 w-32 max-w-[60%] bg-gray-200" />
  </div>
)

const PostsPageSkeleton: NextPage = () => {
  return (
    <div className="p-6">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  )
}

const PostsPage: PageWithSkeleton<PageProps> = props => {
  // SWRのSuspenseモードを使用
  const { data: posts } = useSWR<Posts>(
    '/api/posts',
    () => fetch('/api/posts').then(res => res.json()),
    { fallbackData: props.posts, suspense: true, revalidateOnMount: false },
  )

  return (
    <div className="p-6">
      {posts?.map(({ id, title, content }) => (
        <div className="mt-4 first:mt-0" key={id}>
          <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
          <div className="mt-2 text-gray-500">{content}</div>
        </div>
      ))}
      <div className="mt-4">
        <Link href="/">
          <a className="text-blue-500 underline hover:no-underline">Go back</a>
        </Link>
      </div>
    </div>
  )
}

PostsPage.skeleton = PostsPageSkeleton

export const getServerSideProps: GetServerSideProps = withSkeletonFallback(
  async _ctx => {
    await new Promise<void>(resolve => setTimeout(resolve, 1000))

    return {
      props: {
        posts: [
          { id: 1, title: 'abc', content: 'def from ssr' },
          { id: 2, title: 'ghi', content: 'jkl' },
        ],
      },
    }
  },
)

export default PostsPage
