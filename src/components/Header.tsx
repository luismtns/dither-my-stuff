import { Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { GitFork, Heart, Sparkles } from 'lucide-react';
import Logo from './Logo';
import { ThemeToggle } from './ToggleTheme';

function Header() {
  return (
    <Flex
      component='header'
      w={'100%'}
      display={'flex'}
      direction={{ base: 'column-reverse', md: 'row' }}
      justify={'flex-start'}
      mb={'lg'}>
      <Logo />
      <Stack align='flex-end' justify='flex-start' gap={'md'}>
        <Group gap='xs'>
          <Group gap='xs'>
            <GitFork size={16} />
            <Text size={'sm'} lts={'0.1rem'}>
              Contribute on{' '}
              <a href='https://github.com/luismtns/dither-my-stuff' target='_blank'>
                GitHub
              </a>
            </Text>
          </Group>
          <Divider size='sm' orientation='vertical' />
          <Group gap='xs'>
            <Sparkles size={16} />
            <Text size={'sm'} lts={'0.1rem'}>
              Made with <Heart fill='var(--mantine-color-brass-4)' size={12} color='var(--mantine-color-brass-4)' /> by{' '}
              <a href='https://luisbovo.com.br' target='_blank'>
                Luís Bovo
              </a>
            </Text>
          </Group>
        </Group>

        <Group gap='xs'>
          <ThemeToggle />
        </Group>
      </Stack>
    </Flex>
  );
}

export default Header;
