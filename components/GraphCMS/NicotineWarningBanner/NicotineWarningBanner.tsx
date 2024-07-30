import { RichText } from '@graphcommerce/graphcms-ui'
import { NicotineWarningBannerFragment } from './NicotineWarningBanner.gql'

export function NicotineWarningBanner(props: NicotineWarningBannerFragment) {
    const { message } = props

    return (
        <RichText
            {...message}
            sxRenderer={{
                paragraph: {
                    textAlign: 'center' as const,
                },
                'heading-one': (theme) => ({
                    color: theme.palette.primary.main,
                }),
            }}
        />
    )
}