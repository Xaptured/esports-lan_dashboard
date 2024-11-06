import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Button,
  Container,
  ButtonProps,
  CircularProgress,
  Box,
  Grid,
} from '@mui/material';
import { CustomNavigationButtonProps } from '@/types/CustomNavigationButtonProps';

export default function NavigationButtons(props: CustomNavigationButtonProps) {
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    paddingLeft: `${props.padding?.left}%` || '2%',
    paddingTop: `${props.padding?.top}%` || '1.5%',
    paddingRight: `${props.padding?.right}%` || '2%',
    paddingBottom: `${props.padding?.bottom}%` || '1.5%',
    fontSize: `${props.fontSize}px` || '14px',
    backgroundColor: props.backgroundColor || theme.palette.primary.main,
    borderRadius: props.radius || 25,
    '&:hover': {
      backgroundColor:
        props.hoverBackgroundColor || theme.palette.primary.light,
    },
  }));
  return (
    <Grid container spacing={2} className="mt-6">
      <Grid item xl={6}>
        <ColorButton
          variant="contained"
          size={props.size}
          className={props.styleString}
          type={props.prevButtonType}
          onClick={props.handlePrevClick}
        >
          {props.prevButtonText}
        </ColorButton>
      </Grid>
      <Grid item xl={6}>
        <ColorButton
          variant="contained"
          size={props.size}
          className={props.styleString}
          type={props.nextButtonType}
          onClick={props.handleNextClick}
        >
          {props.nextButtonText}
        </ColorButton>
      </Grid>
    </Grid>
  );
}
