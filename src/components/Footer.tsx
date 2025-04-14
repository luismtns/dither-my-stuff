import { Container, Group, Stack, Text } from '@mantine/core';
import { Copyright } from 'lucide-react';
import Logo from './Logo';

function Footer() {
  return (
    <Container fluid mt={'xl'} mb={'xs'}>
      <Stack align={'center'} gap={92}>
        <Group justify='center' gap='xs'>
          <Text ta={'right'}>MIT License</Text>
          <Copyright size={16} />
          <Text ta={'right'}>{new Date().getFullYear()}</Text>
        </Group>

        <Group align={'center'} justify={'center'} gap={64} my={92}>
          <Logo showGif={false} />

          <img src={'./footer-dither.gif'} alt='logo' width={320} />
        </Group>
      </Stack>
    </Container>
  );
}

export default Footer;
