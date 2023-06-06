import { Box, Skeleton, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';

const SkeletonStatBox = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <>
            <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
            </Box>
            <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
            </Box>
            <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
            </Box>
            <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
            </Box>
        </>
    )
}

export default SkeletonStatBox