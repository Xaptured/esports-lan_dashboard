'use client';

import * as React from 'react';
import { cn } from '../../utilities/utils';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  useTheme,
  Radio,
} from '@mui/material';
import { CustomRadioInputProps } from '@/types/CustomRadioInputProps';

export const RadioInput = React.forwardRef<
  HTMLInputElement,
  CustomRadioInputProps
>(({ className, error, helperText, radioTypes, name, control }) => {
  const theme = useTheme();
  const inputTheme =
    theme.palette.mode === 'dark'
      ? 'bg-zinc-800 text-white placeholder-text-neutral-600 focus-visible:ring-neutral-600 shadow-[0px_0px_1px_1px_var(--neutral-700)]'
      : 'bg-gray-50 text-white placeholder:text-neutral-400 focus-visible:ring-neutral-400';
  const radius = 200;
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <motion.div
      style={{
        background: useMotionTemplate`
            radial-gradient(
              ${
                visible ? radius + 'px' : '0px'
              } circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl
            {...field}
            error={error}
            fullWidth
            className={cn(
              `flex h-15 w-full border-none shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
                file:text-sm file:font-medium
                focus-visible:outline-none focus-visible:ring-[2px]
                disabled:cursor-not-allowed disabled:opacity-50
                group-hover/input:shadow-none transition duration-400 ${inputTheme}`,
              className
            )}
            variant="standard"
          >
            <RadioGroup
              name={name}
              row
              className="flex items-center justify-around"
            >
              {Object.entries(radioTypes).map(([key, value]) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={value}
                />
              ))}
            </RadioGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        )}
      />
    </motion.div>
  );
});
