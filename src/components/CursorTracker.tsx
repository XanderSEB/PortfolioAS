import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export const CursorTracker = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  const { x, y } = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        if (cursorRef.current && cursorDotRef.current) {
          const cursor = cursorRef.current;
          const dot = cursorDotRef.current;
          
          // Smooth cursor movement with delay
          const currentX = parseFloat(cursor.style.left) || x;
          const currentY = parseFloat(cursor.style.top) || y;
          
          const diffX = x - currentX;
          const diffY = y - currentY;
          
          const speed = 0.15; // Adjust for delay amount
          const newX = currentX + diffX * speed;
          const newY = currentY + diffY * speed;
          
          cursor.style.left = `${newX}px`;
          cursor.style.top = `${newY}px`;
          
          // Dot follows immediately
          dot.style.left = `${x}px`;
          dot.style.top = `${y}px`;
        }
      }
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [x, y]);

  useEffect(() => {
    // Wait for DOM to be ready
    let cleanup: (() => void) | null = null;
    
    const timeoutId = setTimeout(() => {
      // Add magnetic effect to interactive elements
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
      
      const handleMouseEnter = () => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'scale(1.5)';
          cursorRef.current.style.background = 'rgba(14, 165, 233, 1)';
        }
      };
      
      const handleMouseLeave = () => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'scale(1)';
          cursorRef.current.style.background = 'rgba(14, 165, 233, 0.8)';
        }
      };
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      
      cleanup = () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          left: x,
          top: y,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot"
        style={{
          left: x,
          top: y,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

