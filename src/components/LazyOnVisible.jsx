import { useEffect, useRef, useState } from "react";

export default function LazyOnVisible({ children, minHeight = 0, rootMargin = "300px" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return undefined;

    const element = ref.current;
    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={ref} style={!isVisible && minHeight ? { minHeight } : undefined}>
      {isVisible ? children : null}
    </div>
  );
}
