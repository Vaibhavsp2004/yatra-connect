
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'light' | 'dark' | 'colored';
}

const GlassMorphism = ({
  children,
  className,
  style,
  variant = 'default',
}: GlassMorphismProps) => {
  const variantClasses = {
    default: 'bg-white/10 backdrop-blur-md border border-white/20',
    light: 'bg-white/70 backdrop-blur-md border border-white/50',
    dark: 'bg-black/10 backdrop-blur-md border border-black/10',
    colored: 'bg-primary/10 backdrop-blur-md border border-primary/20',
  };

  return (
    <div
      className={cn(
        variantClasses[variant],
        'rounded-2xl shadow-sm',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassMorphism;
