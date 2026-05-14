'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PremiumButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const PremiumButton = ({
  variant = 'primary',
  className,
  children,
  ...props
}: PremiumButtonProps) => {
  const variants = {
    primary: 'bg-brand-gold text-brand-midnight hover:bg-brand-gold/90',
    secondary: 'bg-brand-midnight text-brand-parchment hover:bg-brand-midnight/90 border border-brand-gold/20',
    outline: 'bg-transparent text-brand-gold border border-brand-gold hover:bg-brand-gold hover:text-brand-midnight',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'px-8 py-4 rounded-full font-sans font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-xl inline-flex items-center justify-center',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
