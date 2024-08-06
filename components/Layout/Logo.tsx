import { Logo as LogoBase } from '@graphcommerce/next-ui'
import pngLogo from './Vape_Wholesale_USA_Vivo_Logo.png'

export function Logo() {
  return (
    <LogoBase
      sx={{
        '& .GcLogo-logo': {
          width: 'auto',
          height: { xs: '35px', md: '50px' },
          paddingLeft: { xs: '10px', md: 0 },
          marginTop: { xs: 0, md: '-5px' },
          filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
        },
      }}
      image={{ alt: 'Vapewholesalseusa Logo', src: pngLogo, unoptimized: true }}
    />
  )
}
