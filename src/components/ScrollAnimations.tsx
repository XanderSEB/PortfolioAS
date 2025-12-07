import { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ScrollAnimationsProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export const ScrollAnimations = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollAnimationsProps) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });
  
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, x: 0 };
      case 'down':
        return { y: -50, x: 0 };
      case 'left':
        return { y: 0, x: 50 };
      case 'right':
        return { y: 0, x: -50 };
      default:
        return { y: 0, x: 0 };
    }
  };

  const initial = getInitialPosition();

  return (
    <motion.div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, ...initial }}
      animate={
        hasIntersected
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, ...initial }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax = ({ children, speed = 0.5, className = '' }: ParallaxProps) => {
  const { elementRef } = useIntersectionObserver();
  const { scrollYProgress } = useScroll({
    target: elementRef as React.RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={elementRef as React.RefObject<HTMLDivElement>} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

