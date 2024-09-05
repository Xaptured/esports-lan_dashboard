import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Button,
  Container,
  ButtonProps,
  CircularProgress,
  Box,
} from '@mui/material';
import { CustomButtonProps } from '@/types/CustomButtonProps';

export default function CenterButton(props: CustomButtonProps) {
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
    <Container
      sx={{
        mt: props.margin?.top || 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {props.isLoading ? (
        <Box sx={{ height: '48.17px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {props.icon ? (
            <>
              {props.leftIcon ? (
                <ColorButton
                  variant="contained"
                  startIcon={props.leftIcon}
                  size={props.size}
                  className={props.styleString}
                  type={props.buttonType}
                  onClick={props.handleClick}
                >
                  {props.buttonText}
                </ColorButton>
              ) : (
                <ColorButton
                  variant="contained"
                  endIcon={props.rightIcon}
                  size={props.size}
                  className={props.styleString}
                  type={props.buttonType}
                  onClick={props.handleClick}
                >
                  {props.buttonText}
                </ColorButton>
              )}
            </>
          ) : (
            <ColorButton
              variant="contained"
              size={props.size}
              className={props.styleString}
              type={props.buttonType}
              onClick={props.handleClick}
            >
              {props.buttonText}
            </ColorButton>
          )}
        </>
      )}
    </Container>
  );
}
