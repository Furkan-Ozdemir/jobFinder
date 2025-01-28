import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  endValue: number;
}

export const AnimatedCounter = ({ endValue }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const duration = 2000;
  const steps = 60;
  const interval = duration / steps;

  useEffect(() => {
    if (count < endValue) {
      const timer = setTimeout(() => {
        setCount((prev) =>
          Math.min(prev + Math.ceil(endValue / steps), endValue)
        );
      }, interval);
      return () => clearTimeout(timer);
    }
  }, [count, endValue]);

  return <span>{count.toLocaleString()}</span>;
};

export default AnimatedCounter;
