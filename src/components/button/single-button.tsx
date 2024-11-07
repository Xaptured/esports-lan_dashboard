import { SingleButtonProps } from '@/types/SingleButtonProps';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';

export default function SingleButton(props: SingleButtonProps) {
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
    <ColorButton
      variant="contained"
      size={props.size}
      className={props.styleString}
      type={props.buttonType}
      onClick={props.handleClick}
    >
      {props.buttonText}
    </ColorButton>
  );
}
