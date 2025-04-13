interface DitherOptions {
  image: HTMLImageElement | null;
  palette: string;
  customPalette: string;
  mode: 'floyd' | 'bayer';
  levels: number;
  scale: number;
}
