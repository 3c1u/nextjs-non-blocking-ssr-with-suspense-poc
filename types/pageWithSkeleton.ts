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
    // HACK: ページSSRから呼び出されない場合は`/_next`パスを経由するので，
    // その場合はクライアントレンダリングと判断しSSRの処理を飛ばす．
    // NOTE: SSR自体は走るので，そちらがボトルネックになっている場合はどうしてもblockingしてしまうので注意．
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
