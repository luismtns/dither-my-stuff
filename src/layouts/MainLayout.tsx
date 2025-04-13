import { Container, Flex } from '@mantine/core';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MarqueeBig from '../components/Marquee/Big';

type Props = {
  children: React.ReactNode;
};
function MainLayout({ children }: Props) {
  return (
    <main>
      <Flex mih={'calc(100vh - 120px)'} justify={'center'} align={'center'}>
        <Container w={'100%'} py={'lg'}>
          <Header />
          {children}
        </Container>
      </Flex>
      <MarqueeBig />
      <Footer />
    </main>
  );
}

export default MainLayout;
