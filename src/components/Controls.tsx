// src/components/Controls.tsx
import { Group, InputLabel, Select, Slider, Stack, Switch, TextInput, Title } from '@mantine/core';
import ditherRegistry from './Dither/Registry';

const PRESET_PALETTES = [
  { value: 'bw', label: 'Black & White' },
  { value: 'gameboy', label: 'Gameboy' },
  { value: 'sepia', label: 'Sepia' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'custom', label: 'Custom Palette' },
];

interface ControlsProps {
  effect: DitherEffect;
  onChange: (updated: DitherEffect) => void;
}

export function Controls({ effect, onChange }: ControlsProps) {
  const selectedAlgorithm = ditherRegistry.find((a) => a.id === effect.algorithmId);

  const handleParamChange = (key: string, value: unknown) => {
    onChange({
      ...effect,
      parameters: {
        ...effect.parameters,
        [key]: value,
      },
    });
  };

  const handleDistanceTypeChange = (type: ColorDistanceType) => {
    onChange({
      ...effect,
      colorDistance: type === 'custom' ? { type, weights: { r: 1, g: 1, b: 1 } } : { type },
    });
  };

  const updateWeight = (channel: 'r' | 'g' | 'b', value: number) => {
    if (effect.colorDistance.type !== 'custom') return;
    onChange({
      ...effect,
      colorDistance: {
        ...effect.colorDistance,
        weights: {
          ...effect.colorDistance.weights!,
          [channel]: value,
        },
      },
    });
  };

  return (
    <Stack>
      <Title order={1} ff={'text'} lts={'0.2rem'} c='brass'>
        Dithering controls
      </Title>
      <Group grow>
        <Select
          label='Algorithm'
          data={ditherRegistry.map((algo) => ({ value: algo.id, label: algo.name }))}
          value={effect.algorithmId}
          onChange={(value) => {
            if (!value) return;
            const newAlgo = ditherRegistry.find((a) => a.id === value);
            if (!newAlgo) return;
            onChange({
              ...effect,
              algorithmId: value,
              parameters: {},
            });
          }}
        />

        <Select
          label='Palette'
          data={PRESET_PALETTES}
          value={effect.paletteId}
          onChange={(value) => {
            if (!value) return;
            onChange({
              ...effect,
              paletteId: value,
            });
          }}
        />
      </Group>

      {effect.paletteId === 'custom' && (
        <TextInput
          label='Custom Palette (comma-separated hex)'
          placeholder='#000000, #ffffff'
          value={effect.customPalette?.join(', ') || ''}
          onChange={(e) => {
            const colors = e.currentTarget.value.split(',').map((c) => c.trim());
            onChange({ ...effect, customPalette: colors });
          }}
        />
      )}

      <Switch
        label='Grayscale'
        checked={effect.grayscale}
        onChange={(e) => onChange({ ...effect, grayscale: e.currentTarget.checked })}
      />

      <Select
        label='Color Distance'
        data={['euclidean', 'manhattan', 'custom']}
        value={effect.colorDistance.type}
        onChange={(value) => handleDistanceTypeChange(value as ColorDistanceType)}
      />

      {effect.colorDistance.type === 'custom' && (
        <Stack gap='xs'>
          <InputLabel htmlFor='custom-weight'>Custom Color Weights</InputLabel>
          <Group grow gap={'xs'}>
            <Stack gap={'xs'}>
              <InputLabel htmlFor='custom-weight-red'>Red</InputLabel>
              <Slider
                id='custom-weight-red'
                min={0}
                max={5}
                step={0.1}
                value={effect.colorDistance.weights?.r ?? 1}
                onChange={(value) => updateWeight('r', value)}
                size={'lg'}
                radius={'xs'}
              />
            </Stack>
            <Stack gap={'xs'}>
              <InputLabel htmlFor='custom-weight-green'>Green</InputLabel>

              <Slider
                id='custom-weight-green'
                min={0}
                max={5}
                step={0.1}
                value={effect.colorDistance.weights?.g ?? 1}
                onChange={(value) => updateWeight('g', value)}
                size={'lg'}
                radius={'xs'}
              />
            </Stack>
            <Stack gap={'xs'}>
              <InputLabel htmlFor='custom-weight-blue'>Blue</InputLabel>
              <Slider
                id='custom-weight-blue'
                min={0}
                max={5}
                step={0.1}
                value={effect.colorDistance.weights?.b ?? 1}
                onChange={(value) => updateWeight('b', value)}
                size={'lg'}
                radius={'xs'}
              />
            </Stack>
          </Group>
        </Stack>
      )}

      {selectedAlgorithm &&
        Object.entries(selectedAlgorithm.params).map(([key, param]) => {
          if (param.type === 'slider') {
            return (
              <Stack>
                <InputLabel htmlFor={`slider-${key}`}>{param.label}</InputLabel>
                <Slider
                  id={`slider-${key}`}
                  key={key}
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={(effect.parameters[key] as number) ?? param.default}
                  onChange={(value) => handleParamChange(key, value)}
                  marks={[{ value: param.min }, { value: param.max }]}
                  size={'xl'}
                  radius={'xs'}
                />
              </Stack>
            );
          }
          return null;
        })}
    </Stack>
  );
}
