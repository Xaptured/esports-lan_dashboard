type BasicCustomButtonProps = {
    size: 'small' | 'medium' | 'large';
    buttonText: string;
    margin?: {
        top: number;
        bottom: number;
    }
    padding?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }
    fontSize?: string;
    radius?: number;
    backgroundColor?: string;
    hoverBackgroundColor?: string;
}

type IconOptions = BasicCustomButtonProps & {
  icon: true;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & (
  | { leftIcon: React.ReactNode; rightIcon?: never }
  | { leftIcon?: never; rightIcon: React.ReactNode }
);

type NoIconOptions = BasicCustomButtonProps &{
  icon: false;
  leftIcon?: never;
  rightIcon?: never;
};

export type CustomButtonProps = IconOptions | NoIconOptions;
