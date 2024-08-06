// components/AgeVerificationModal/index.tsx
import React from 'react'
import { Dialog, DialogContent, DialogActions, Typography, Button } from '@mui/material'
import { extendableComponent } from '@graphcommerce/next-ui'
import { useAgeVerification } from '../../hooks/useAgeVerification'
import { AgeIcon } from './AgeIcon'

const { classes } = extendableComponent('AgeVerificationModal', ['root', 'content', 'actions'])

export function AgeVerificationModal() {
  const { isVerified, verifyAge } = useAgeVerification()

  const handleYes = () => {
    verifyAge(true)
  }

  const handleNo = () => {
    // Implement logic for users under 21
    verifyAge(false)
  }

  if (isVerified === null) {
    return null
  }

  return (
    <Dialog
      open={!isVerified}
      onClose={() => {}}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: (theme) => theme.shape.borderRadius,
          maxWidth: 400,
        },
      }}
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: (theme) => theme.spacing(3),
        }}
      >
        <Typography
          variant='h3'
          component='h2'
          id='age-verification-title'
          align='center'
          sx={{ mt: 2, mb: 2 }}
        >
          Age Verification
        </Typography>
        <Typography align='center'>Are you 21 years of age or older?</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          padding: (theme) => theme.spacing(2),
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={handleNo} color='secondary' variant='outlined'>
          No
        </Button>
        <Button onClick={handleYes} color='primary' variant='contained'>
          Yes, I am 21 or older
        </Button>
      </DialogActions>
    </Dialog>
  )
}
