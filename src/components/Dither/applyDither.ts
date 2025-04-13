export const applyDither = (
  image: HTMLImageElement,
  effect: DitherEffect,
  algorithm: DitherAlgorithm,
  palette: number[][]
): Promise<ImageData> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve(new ImageData(image.width, image.height));

    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const result = algorithm.apply(imageData, {
      palette,
      grayscale: effect.grayscale,
      colorDistance: effect.colorDistance,
      params: effect.parameters || {},
    });

    resolve(result);
  });
};
