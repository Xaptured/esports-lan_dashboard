'use client';
import * as React from 'react';
import { cn } from '../../utilities/utils';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import { CustomInputProps } from '@/types/CustomInputProps';
import { Controller } from 'react-hook-form';
import { CredentialsType } from '@/schemas/credentials';

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({
    className,
    error,
    helperText,
    label,
    type,
    placeholder,
    name,
    control,
  }) => {
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
            <TextField
              type={type === 'password' ? 'password' : 'text'}
              error={error}
              helperText={helperText}
              label={label}
              placeholder={placeholder}
              {...field}
              className={cn(
                `flex h-13 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
                file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
                focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                group-hover/input:shadow-none transition duration-400`,
                className
              )}
              variant="standard"
              size="small"
              fullWidth
            />
          )}
        />
      </motion.div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export { CustomInput };
