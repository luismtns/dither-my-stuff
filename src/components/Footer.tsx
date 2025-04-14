import { Container, Flex, Group, Stack, Text, Title } from '@mantine/core';
import { Copyright, GitFork, Sparkles } from 'lucide-react';

function Footer() {
  return (
    <Container fluid mt={'xl'} mb={'xs'}>
      <Stack align={'center'} gap={92}>
        <Flex
          direction={{
            xs: 'column',
            md: 'row',
          }}
          align={'center'}
          w={'100%'}
          justify='space-between'
          gap={'lg'}>
          <Group gap='xs'>
            <GitFork size={16} />
            <Text size={'md'} lts={'0.1rem'}>
              Contribute on{' '}
              <a href='https://github.com/luismtns/dither-my-stuff' target='_blank'>
                GitHub
              </a>
            </Text>
          </Group>

          <Group gap='xs'>
            <Sparkles size={16} />
            <Text size={'md'} lts={'0.1rem'}>
              Made with 💚 by{' '}
              <a href='https://luisbovo.com.br' target='_blank'>
                Luís Bovo
              </a>
            </Text>
          </Group>
          <Group justify='center' gap='xs'>
            <Text ta={'right'}>MIT License</Text>
            <Copyright size={16} />
            <Text ta={'right'}>{new Date().getFullYear()}</Text>
          </Group>
        </Flex>

        <Stack align={'center'} justify={'center'} gap={64} my={92}>
          <Title size={42} ta='center' lts={'0.3rem'} mb={'xs'} lh={0.5}>
            <s>Dither</s>
            <Title size={'75%'} component={'span'} ff={'text'} lts={'0'} ml={12}>
              my stuff
            </Title>
          </Title>

          <img src={'./footer-dither.gif'} alt='logo' width={320} />
        </Stack>
      </Stack>
    </Container>
  );
}

export default Footer;
