import { GetServerSideProps, NextPage, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'

export type PageWithSkeleton<
  _PageProps = {},
  _InitialProps = _PageProps,
> = NextPage<_PageProps, _InitialProps> & {
  skeleton?: NextPage<{}>
}

export const withSkeletonFallback = <
  _Props extends { [key: string]: any } = { [key: string]: any },
  _Query extends ParsedUrlQuery = ParsedUrlQuery,
  _PreviewData extends PreviewData = PreviewData,
>(
  getServerSideProps: GetServerSideProps<_Props, _Query, _PreviewData>,
): GetServerSideProps<_Props | {}, _Query, _PreviewData> => {
  return async ctx => {
    if (ctx.req.url?.startsWith('/_next')) {
      return {
        props: {
          __PAGE_SKELETON_FALLBACK__: true,
        },
      }
    }

    return getServerSideProps(ctx)
  }
}
