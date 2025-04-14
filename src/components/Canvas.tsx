import { Button, Image, Stack } from '@mantine/core';
import { Download } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { applyDither } from './Dither/applyDither';

interface CanvasProps {
  image: HTMLImageElement | null;
  effect: DitherEffect;
  algorithm: DitherAlgorithm;
  palette: number[][];
}

export function Canvas({ image, effect, algorithm, palette }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    applyDither(image, effect, algorithm, palette).then((processedImageData) => {
      ctx.putImageData(processedImageData, 0, 0);
      setPreviewUrl(canvas.toDataURL('image/png'));
    });
  }, [image, effect, algorithm, palette]);

  const handleDownload = () => {
    if (!previewUrl) return;

    const link = document.createElement('a');
    link.download = `dither-my-stuff-${Date.now()}.png`;
    link.href = previewUrl;
    link.click();
  };

  return (
    <Stack w='100%' align='center'>
      {previewUrl && (
        <Image src={previewUrl} alt='Dithered preview' w='100%' maw={512} style={{ border: '1px solid #444' }} />
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <Button variant='light' onClick={handleDownload} leftSection={<Download size={16} />}>
        Download Image
      </Button>
    </Stack>
  );
}
