// src/components/Canvas.tsx
import { Box } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { applyDither } from './Dither/applyDither';

interface CanvasProps {
  image: HTMLImageElement | null;
  effect: DitherEffect;
  algorithm: DitherAlgorithm;
  palette: number[][];
}

export function Canvas({ image, effect, algorithm, palette }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    applyDither(image, effect, algorithm, palette).then((processedImageData) => {
      ctx.putImageData(processedImageData, 0, 0);
    });
  }, [image, effect, algorithm, palette]);

  return (
    <Box w={'100%'}>
      <canvas ref={canvasRef} style={{ maxWidth: '100%', width: '100%', border: '1px solid #444' }} />
    </Box>
  );
}
