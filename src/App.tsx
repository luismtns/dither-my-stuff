import { Container, Flex } from '@mantine/core';
import Dither from './components/Dither/Dither';
import Footer from './components/Footer';
import Header from './components/Header';
import MarqueeBig from './components/Marquee/Big';

function App() {
  return (
    <main>
      <Flex mih={'calc(100vh - 120px)'} justify={'center'} align={'center'}>
        <Container w={'100%'} py={'lg'}>
          <Header />
          <Dither />
        </Container>
      </Flex>
      <MarqueeBig />
      <Footer />
    </main>
  );
}

export default App;
