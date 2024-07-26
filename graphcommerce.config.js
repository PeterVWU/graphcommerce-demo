// @ts-check

/**
 * Docs: https://graphcommerce.org/docs/framework/config
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
    hygraphEndpoint: 'https://us-west-2.cdn.hygraph.com/content/clz37ad2200of07uzbi0btwvs/master',
    magentoEndpoint: 'http://vapewholesaleusa.local/graphql',
    canonicalBaseUrl: 'http://vapewholesaleusa.local',
    storefront: [
        { locale: 'en', magentoStoreCode: 'default', defaultLocale: true },
    ],
    recentlyViewedProducts: {
        enabled: true,
    },
}

module.exports = config
