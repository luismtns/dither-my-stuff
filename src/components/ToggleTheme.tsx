// src/components/ThemeToggle.tsx
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      variant='outline'
      size='lg'
      aria-label='Toggle color scheme'
      color={dark ? 'yellow' : 'blue'}>
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </ActionIcon>
  );
}
