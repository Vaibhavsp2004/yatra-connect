
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-in' | 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'scale-in';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation: AnimationType;
  className?: string;
  delay?: number;
  threshold?: number;
  duration?: number;
}

const AnimatedElement = ({
  children,
  animation,
  className = '',
  delay = 0,
  threshold = 0.1,
  duration = 0.6,
}: AnimatedElementProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  const animationClass = isVisible ? `animate-${animation}` : 'opacity-0';
  
  return (
    <div
      ref={ref}
      className={cn(
        animationClass,
        className
      )}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
