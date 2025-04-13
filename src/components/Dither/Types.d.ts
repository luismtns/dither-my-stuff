type ColorDistanceType = 'euclidean' | 'manhattan' | 'custom';

interface ColorDistanceConfig {
  type: ColorDistanceType;
  weights?: {
    r: number;
    g: number;
    b: number;
  };
}

interface DitherEffect {
  id: string;
  name: string;
  author?: string;
  algorithmId: string;
  paletteId: string;
  customPalette?: string[]; // hex strings
  scale: number;
  grayscale: boolean;
  colorDistance: ColorDistanceConfig;
  parameters: Record<string, unknown>; // Algorithm-specific parameters
  createdAt: string;
}

interface DitherAlgorithm {
  id: string;
  name: string;
  description: string;
  params: Record<string, DitherParam>;
  apply(
    imageData: ImageData,
    context: {
      palette: number[][];
      grayscale: boolean;
      colorDistance: ColorDistanceConfig;
      params: Record<string, unknown>;
    }
  ): ImageData;
}

type DitherParam =
  | { type: 'slider'; label: string; min: number; max: number; step?: number; default: number }
  | { type: 'select'; label: string; options: string[]; default: string }
  | { type: 'boolean'; label: string; default: boolean };

interface DitherPalette {
  id: string;
  name: string;
  colors: string[];
  type: 'preset' | 'custom';
}
