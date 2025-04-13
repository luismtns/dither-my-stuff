import { Flex } from '@mantine/core';
import Logo from './Logo';
import { ThemeToggle } from './ToggleTheme';

function Header() {
  return (
    <Flex component='header' w={'100%'} display={'flex'}>
      <Logo />
      <Flex pos={'absolute'} right={0} top={0} m={16}>
        <ThemeToggle />
      </Flex>
    </Flex>
  );
}

export default Header;
