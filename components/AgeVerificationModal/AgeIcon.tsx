// components/AgeVerificationModal/AgeIcon.tsx
import React from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'

export const AgeIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d='M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V9h8v2zm0-4H8V5h8v2z' />
  </SvgIcon>
)
