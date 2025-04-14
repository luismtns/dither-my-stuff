import { Button, FileButton, Flex, Group, Image as MImage, Stack, Text } from '@mantine/core';
import { Download, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { applyDither } from './Dither/applyDither';

interface CanvasProps {
  effect: DitherEffect;
  algorithm: DitherAlgorithm;
  palette: number[][];
}

const SAMPLE_IMAGE_PATH = './sample.png';

const CanvasBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Flex
      pos={'relative'}
      w={'100%'}
      mih={512}
      mah={512}
      flex={1}
      align={'center'}
      justify={'center'}
      bg={'rgba(0,0,0,0.1)'}>
      {children}{' '}
    </Flex>
  );
};

export function Canvas({ effect, algorithm, palette }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsProcessing(true);

    canvas.width = image.width;
    canvas.height = image.height;

    applyDither(image, effect, algorithm, palette).then((processedImageData) => {
      ctx.putImageData(processedImageData, 0, 0);
      setPreviewUrl(canvas.toDataURL('image/png'));

      setIsProcessing(false);
    });
  }, [image, effect, algorithm, palette]);

  const handleSampleImage = () => {
    const img = new Image();
    img.src = SAMPLE_IMAGE_PATH;
    img.onload = () => setImage(img as HTMLImageElement);
  };

  const handleDownload = () => {
    if (!previewUrl) return;

    const link = document.createElement('a');
    link.download = `dither-my-stuff-${Date.now()}.png`;
    link.href = previewUrl;
    link.click();
  };

  const handleUpload = (file: File | null) => {
    if (!file) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img: HTMLImageElement = new Image();
      img.onload = () => setImage(img);
      img.src = e.target?.result as string;

      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  if (!image)
    return (
      <CanvasBox>
        <Stack w='100%' align='center' gap={'xs'} p='xl'>
          <FileButton accept='image/*' onChange={handleUpload}>
            {(props) => (
              <Button
                leftSection={<Upload size={16} />}
                variant={'outline'}
                style={{ borderStyle: 'dashed' }}
                size='lg'
                w={'100%'}
                disabled={isUploading}
                {...props}>
                {isUploading ? 'Uploading...' : 'Pick a Image to Dithering'}
              </Button>
            )}
          </FileButton>
          <Button variant='transparent' onClick={handleSampleImage}>
            Try with a sample image
          </Button>
        </Stack>
      </CanvasBox>
    );

  return (
    <Stack w='100%' align='center' gap={'xs'}>
      <CanvasBox>
        {previewUrl && (
          <MImage
            src={previewUrl}
            alt='Dithered preview'
            w='100%'
            h={'100%'}
            fit='contain'
            mah={512}
            display={'block'}
          />
        )}
        {(isProcessing || isUploading) && (
          <Flex pos={'absolute'} top={0} left={0} w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text size={'xl'} w={700} c='white' bg='black' display={'inline-flex'} maw={'fit-content'} px={'sm'}>
              Processing...
            </Text>
          </Flex>
        )}
      </CanvasBox>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <Group w={'100%'} justify='flex-end'>
        <FileButton accept='image/*' onChange={handleUpload}>
          {(props) => (
            <Button
              leftSection={<Upload size={16} />}
              variant={'outline'}
              style={{ borderStyle: 'dashed' }}
              disabled={isUploading}
              {...props}>
              {isUploading ? 'Uploading...' : 'Pick a new Image...'}
            </Button>
          )}
        </FileButton>
        <Button variant='light' onClick={handleDownload} leftSection={<Download size={16} />}>
          Download Image
        </Button>
      </Group>
    </Stack>
  );
}
