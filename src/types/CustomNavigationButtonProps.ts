export type CustomNavigationButtonProps = {
  size: 'small' | 'medium' | 'large';
  nextButtonType: 'button' | 'submit' | 'reset';
  prevButtonType: 'button' | 'submit' | 'reset';
  nextButtonText: string;
  prevButtonText: string;
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
  handleNextClick?: () => void;
  handlePrevClick?: () => void;
  isLoading?: boolean;
};
