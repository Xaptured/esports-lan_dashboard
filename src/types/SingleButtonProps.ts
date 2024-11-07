export type SingleButtonProps = {
  size: 'small' | 'medium' | 'large';
  buttonType: 'button' | 'submit' | 'reset';
  buttonText: string;
  margin?: {
    top: number;
    bottom: number;
  };
  padding?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  fontSize?: string;
  radius?: number;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  styleString?: string;
  handleClick?: () => void;
  isLoading?: boolean;
};
