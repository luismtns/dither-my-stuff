import { Container, Space, Title } from '@mantine/core';
import Dither from './components/Dither/Dither';
import MarqueeBig from './components/Marquee/Big';
import { ThemeToggle } from './components/ToggleTheme';

function App() {
  return (
    <main>
      <Container w={'100%'} py={'lg'}>
        <ThemeToggle />
        <Title mb='md' ta='center'>
          Dither{' '}
          <Title component={'span'} ff={'text'}>
            <s>my stuff</s>
          </Title>
        </Title>
        <Dither />
        <Space h={92} />
      </Container>
      <MarqueeBig />
    </main>
  );
}

export default App;
