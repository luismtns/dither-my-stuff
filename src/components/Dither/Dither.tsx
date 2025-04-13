// src/App.tsx
import { Button, FileButton, Grid, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Canvas } from '../Canvas';
import { Controls } from '../Controls';
import ditherRegistry from './Registry';

const DEFAULT_EFFECT: DitherEffect = {
  id: 'preview',
  name: 'Preview',
  algorithmId: 'floyd',
  paletteId: 'bw',
  customPalette: ['#000000', '#ffffff'],
  scale: 1,
  grayscale: false,
  colorDistance: {
    type: 'euclidean',
  },
  parameters: {},
  createdAt: new Date().toISOString(),
};

const PALETTES: Record<string, number[][]> = {
  bw: [
    [0, 0, 0],
    [255, 255, 255],
  ],
  gameboy: [
    [15, 56, 15],
    [48, 98, 48],
    [139, 172, 15],
    [155, 188, 15],
  ],
  sepia: [
    [62, 39, 35],
    [181, 101, 29],
    [245, 201, 150],
  ],
  cyberpunk: [
    [0, 0, 0],
    [255, 0, 255],
    [0, 255, 255],
    [255, 255, 255],
  ],
};

function Dither() {
  const localStorageImage = localStorage.getItem('dither-image');
  const [image, setImage] = useState<HTMLImageElement | null>(
    localStorageImage
      ? () => {
          const img = new Image();
          img.src = localStorageImage;
          img.onload = () => setImage(img);
          return img;
        }
      : null
  );
  const [effect, setEffect] = useState<DitherEffect>(DEFAULT_EFFECT);

  const [debouncedEffect] = useDebouncedValue(effect, 100);

  useEffect(() => {
    if (image) return;
    const img = new Image();
    img.src = './sample.png';
    img.onload = () => setImage(img);
  }, [image]);

  const algorithm = ditherRegistry.find((a) => a.id === debouncedEffect.algorithmId)!;
  const palette =
    debouncedEffect.paletteId === 'custom'
      ? (debouncedEffect.customPalette || []).map(hexToRgb)
      : PALETTES[debouncedEffect.paletteId] || PALETTES.bw;

  const handleUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => setImage(img);
      img.src = e.target?.result as string;
      localStorage.setItem('dither-image', e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Grid>
      <Grid.Col span={6}>
        <Stack>
          <FileButton accept='image/*' onChange={handleUpload}>
            {(props) => (
              <Button leftSection={<Upload size={16} />} variant='light' {...props}>
                {image ? 'Replace Image' : 'Pick a Image'} to Dither
              </Button>
            )}
          </FileButton>

          <Canvas image={image} effect={debouncedEffect} algorithm={algorithm} palette={palette} />
        </Stack>
      </Grid.Col>
      <Grid.Col span={6}>
        <Controls effect={effect} onChange={setEffect} />
      </Grid.Col>
    </Grid>
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace('#', '');
  const bigint = parseInt(
    c.length === 3
      ? c
          .split('')
          .map((x) => x + x)
          .join('')
      : c,
    16
  );
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export default Dither;
