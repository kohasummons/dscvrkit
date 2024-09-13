import { useEffect, useRef } from 'react';

export function useResizeObserver(canvasClient) {
  const resizeObserverRef = useRef();

  useEffect(() => {
    if (canvasClient) {
      resizeObserverRef.current = new ResizeObserver(() => canvasClient.resize());
      resizeObserverRef.current.observe(document.body);

      return () => {
        resizeObserverRef.current?.disconnect();
        canvasClient.destroy();
      };
    }
  }, [canvasClient]);
}