'use client';
import * as React from 'react';
import { cn } from '../../utilities/utils';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import { CustomInputProps } from '@/types/CustomInputProps';
import { Controller } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { CustomDatepickerProps } from '@/types/CustomDatepickerProps';

const CustomDatepicker = React.forwardRef<
  HTMLInputElement,
  CustomDatepickerProps
>(
  ({
    className,
    error,
    helperText,
    handleOnChange,
    getDateValue,
    name,
    control,
  }) => {
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                name={name}
                disablePast
                slotProps={{
                  textField: {
                    helperText: helperText,
                    placeholder: 'MM/DD/YYYY',
                    error: error,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        border: 'none',
                        borderRadius: 0,
                        borderBottom: error
                          ? '2px solid #E44236'
                          : '2px solid gray',
                        height: '42px',
                        '&:hover': {
                          borderBottom: error
                            ? '2px solid red'
                            : '2px solid white',
                        },
                        '&.Mui-focused': {
                          borderBottom: error ? '2px solid red' : '2px solid',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    },
                  },
                }}
                onChange={handleOnChange}
                value={getDateValue()}
                className={cn(
                  `flex h-13 w-full border-none shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
                file:text-sm file:font-medium 
                focus-visible:outline-none focus-visible:ring-[2px]
                disabled:cursor-not-allowed disabled:opacity-50
                group-hover/input:shadow-none transition duration-400 ${inputTheme}`,
                  className
                )}
              />
            </LocalizationProvider>
          )}
        />
      </motion.div>
    );
  }
);

CustomDatepicker.displayName = 'CustomDatepicker';

export { CustomDatepicker };
