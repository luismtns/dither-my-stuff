import { Group, Stack, Title } from '@mantine/core';
type Props = {
  showGif?: boolean;
};
function Logo({ showGif = true }: Props) {
  return (
    <Group align='flex-end' gap={'xl'} flex={1}>
      {showGif && <img src={'./logo.gif'} alt='logo' width={96} />}
      <Stack gap={2}>
        <Title size={42} ta='center' lts={'0.4rem'} lh={0.5}>
          Dither
        </Title>
        <Title order={3} ff={'text'} lts={'0.1rem'} ml={'auto'} mr={8} textWrap='nowrap'>
          my stuff
        </Title>
      </Stack>
    </Group>
  );
}

export default Logo;
