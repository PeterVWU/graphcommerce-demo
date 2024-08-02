
import { RowHeroCarouselFragment } from './RowHeroCarousel.gql'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Container } from '@mui/material'
import Link from 'next/link';

export function RowHeroCarousel(props: RowHeroCarouselFragment) {
    const { images, pageLinks } = props
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Container sx={{ position: 'relative' }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {pageLinks.map((step, index) => (
                    <div key={step.title}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Link href={step.url || '#'} passHref>
                                <Box
                                    component="img"
                                    sx={{
                                        display: 'block',
                                        maxWidth: 1536,
                                        overflow: 'hidden',
                                        width: '100%',
                                        borderRadius: 2,
                                    }}
                                    src={step.asset?.url}
                                    alt={step.title || ''}

                                />
                            </Link>
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                variant="dots"
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'transparent',
                    '& .MuiMobileStepper-dots': {
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    },
                    '& .MuiMobileStepper-dot': {
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '& .MuiMobileStepper-dotActive': {
                        backgroundColor: 'white',
                    },
                }}
                nextButton={<Button style={{ display: 'none' }} />}
                backButton={<Button style={{ display: 'none' }} />}
            />
        </Container>
    );
}


