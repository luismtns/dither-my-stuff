const createErrorDiffusionDither = (
  id: string,
  name: string,
  matrix: [number, number, number][],
  factorParam?: string
): DitherAlgorithm => {
  return {
    id,
    name,
    description: `${name} dithering algorithm`,
    params: {
      [factorParam || 'diffusionFactor']: {
        type: 'slider',
        label: 'Error diffusion factor',
        min: 0,
        max: 2,
        step: 0.01,
        default: 1,
      },
    },
    apply: (imageData, { palette, grayscale, colorDistance, params }) => {
      const data = new Uint8ClampedArray(imageData.data);
      const width = imageData.width;
      const height = imageData.height;
      const factor = (params[factorParam || 'diffusionFactor'] as number) ?? 1;

      const getIndex = (x: number, y: number) => (y * width + x) * 4;

      const findClosest = (r: number, g: number, b: number) => {
        let closest = palette[0];
        let minDist = Infinity;
        for (const [pr, pg, pb] of palette) {
          const dist = (() => {
            if (colorDistance.type === 'manhattan') {
              return Math.abs(r - pr) + Math.abs(g - pg) + Math.abs(b - pb);
            } else if (colorDistance.type === 'custom' && colorDistance.weights) {
              const { r: wr, g: wg, b: wb } = colorDistance.weights;
              return (r - pr) ** 2 * wr + (g - pg) ** 2 * wg + (b - pb) ** 2 * wb;
            } else {
              return (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
            }
          })();

          if (dist < minDist) {
            minDist = dist;
            closest = [pr, pg, pb];
          }
        }
        return closest;
      };

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = getIndex(x, y);
          let [r, g, b] = [data[i], data[i + 1], data[i + 2]];
          if (grayscale) r = g = b = (r + g + b) / 3;
          const [nr, ng, nb] = findClosest(r, g, b);
          const err = [r - nr, g - ng, b - nb];
          data[i] = nr;
          data[i + 1] = ng;
          data[i + 2] = nb;

          for (const [dx, dy, scale] of matrix) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            const ni = getIndex(nx, ny);
            data[ni] += err[0] * scale * factor;
            data[ni + 1] += err[1] * scale * factor;
            data[ni + 2] += err[2] * scale * factor;
          }
        }
      }

      return new ImageData(data, width, height);
    },
  };
};

export const FloydSteinberg = createErrorDiffusionDither('floyd', 'Floyd–Steinberg', [
  [1, 0, 7 / 16],
  [-1, 1, 3 / 16],
  [0, 1, 5 / 16],
  [1, 1, 1 / 16],
]);

export const JarvisJudiceNinke = createErrorDiffusionDither('jarvis', 'Jarvis–Judice–Ninke', [
  [1, 0, 7 / 48],
  [2, 0, 5 / 48],
  [-2, 1, 3 / 48],
  [-1, 1, 5 / 48],
  [0, 1, 7 / 48],
  [1, 1, 5 / 48],
  [2, 1, 3 / 48],
  [-2, 2, 1 / 48],
  [-1, 2, 3 / 48],
  [0, 2, 5 / 48],
  [1, 2, 3 / 48],
  [2, 2, 1 / 48],
]);

export const Stucki = createErrorDiffusionDither('stucki', 'Stucki', [
  [1, 0, 8 / 42],
  [2, 0, 4 / 42],
  [-2, 1, 2 / 42],
  [-1, 1, 4 / 42],
  [0, 1, 8 / 42],
  [1, 1, 4 / 42],
  [2, 1, 2 / 42],
  [-2, 2, 1 / 42],
  [-1, 2, 2 / 42],
  [0, 2, 4 / 42],
  [1, 2, 2 / 42],
  [2, 2, 1 / 42],
]);

export const Atkinson = createErrorDiffusionDither('atkinson', 'Atkinson', [
  [1, 0, 1 / 8],
  [2, 0, 1 / 8],
  [-1, 1, 1 / 8],
  [0, 1, 1 / 8],
  [1, 1, 1 / 8],
  [0, 2, 1 / 8],
]);

export const Sierra = createErrorDiffusionDither('sierra', 'Sierra', [
  [1, 0, 5 / 32],
  [2, 0, 3 / 32],
  [-2, 1, 2 / 32],
  [-1, 1, 4 / 32],
  [0, 1, 5 / 32],
  [1, 1, 4 / 32],
  [2, 1, 2 / 32],
  [-1, 2, 2 / 32],
  [0, 2, 3 / 32],
  [1, 2, 2 / 32],
]);

const ditherRegistry: DitherAlgorithm[] = [FloydSteinberg, JarvisJudiceNinke, Stucki, Atkinson, Sierra];

export default ditherRegistry;
