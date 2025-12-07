import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const MagneticButton = ({
  children,
  className = '',
  onClick,
  href,
}: MagneticButtonProps) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  };

  const content = (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
};

interface Card3DProps {
  children: ReactNode;
  className?: string;
}

export const Card3D = ({ children, className = '' }: Card3DProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{ rotateY: 5, rotateX: 5 }}
      style={{ transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

interface HoverGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export const HoverGlow = ({
  children,
  className = '',
  glowColor = 'rgba(14, 165, 233, 0.5)',
}: HoverGlowProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: `0 0 30px ${glowColor}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};


