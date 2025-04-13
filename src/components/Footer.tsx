import { Container, Group, Stack, Text, Title } from '@mantine/core';
import { Copyright, GitFork, Sparkles } from 'lucide-react';

function Footer() {
  return (
    <Container mt={64} mb={'xs'}>
      <Stack align={'center'} gap={92}>
        <Stack align={'center'} gap={'lg'}>
          <Group gap='xs'>
            <Sparkles size={16} />
            <Text size={'lg'} lts={'0.1rem'}>
              Made with 💚by{' '}
              <a href='https://luisbovo.com.br' target='_blank'>
                Luís Bovo
              </a>
            </Text>
          </Group>

          <Group gap='xs'>
            <GitFork size={16} />
            <Text size={'lg'} lts={'0.1rem'}>
              Contribute on{' '}
              <a href='https://github.com/luismtns/dither-my-stuff' target='_blank'>
                GitHub
              </a>
            </Text>
          </Group>
        </Stack>

        <Stack align={'center'} justify={'center'} gap={64}>
          <img src={'./footer-dither.gif'} alt='logo' width={320} />

          <Title size={42} ta='center' lts={'0.3rem'} mb={'xs'} lh={0.5}>
            <s>Dither</s>
            <Title size={'75%'} component={'span'} ff={'text'} lts={'0'} ml={12}>
              my stuff
            </Title>
          </Title>
        </Stack>

        <Group justify='center' gap='xs'>
          <Text ta={'right'}>MIT License</Text>
          <Copyright size={16} />
          <Text ta={'right'}>{new Date().getFullYear()}</Text>
        </Group>
      </Stack>
    </Container>
  );
}

export default Footer;
