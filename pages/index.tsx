import { PageOptions } from '@graphcommerce/framer-next-pages'
import { hygraphPageContent, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { ProductListDocument, ProductListQuery } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutHeader, MetaRobots, PageMeta } from '@graphcommerce/next-ui'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  RowProduct,
  RowRenderer,
} from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

type Props = HygraphPagesQuery & {
  onSaleList: ProductListQuery
  newArrivalList: ProductListQuery
  disposablesList: ProductListQuery
}
type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function CmsPage(props: Props) {
  const { pages, onSaleList, newArrivalList, disposablesList } = props
  const page = pages?.[0]

  const onSale = onSaleList?.products?.items?.[0]
  const favorite = newArrivalList?.products?.items?.[0]
  const disposables = disposablesList?.products?.items?.[0]

  return (
    <>
      <PageMeta
        title={page?.metaTitle ?? page?.title ?? ''}
        metaDescription={page?.metaDescription ?? ''}
        metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/'
      />

      <LayoutHeader floatingMd floatingSm />

      {page && (
        <RowRenderer
          content={page.content}
          renderer={{
            RowProduct: (rowProps) => {
              const { identity } = rowProps

              if (identity === 'home-new')
                return (
                  <RowProduct {...rowProps} {...favorite} items={newArrivalList.products?.items} />
                )
              if (identity === 'home-sale')
                return <RowProduct {...rowProps} {...onSale} items={onSaleList.products?.items} />
              if (identity === 'home-disposables')
                return (
                  <RowProduct {...rowProps} {...disposables} items={disposablesList.products?.items} />
                )
              return (
                <RowProduct {...rowProps} {...favorite} items={newArrivalList.products?.items} />
              )
            },
          }}
        />
      )}
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = hygraphPageContent(staticClient, 'page/home')
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  // todo(paales): Remove when https://github.com/Urigo/graphql-mesh/issues/1257 is resolved
  const newArrivalList = staticClient.query({
    query: ProductListDocument,
    variables: { pageSize: 8, filters: { category_uid: { eq: 'NjM=' } } },
  })

  const onSaleList = staticClient.query({
    query: ProductListDocument,
    variables: { pageSize: 8, filters: { category_uid: { eq: 'NjQ=' } } },
  })

  const disposablesList = staticClient.query({
    query: ProductListDocument,
    variables: { pageSize: 8, filters: { category_uid: { eq: 'Mw==' } } },
  })

  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      onSaleList: (await onSaleList).data,
      newArrivalList: (await newArrivalList).data,
      disposablesList: (await disposablesList).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
