import { Container } from '@mantine/core';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MarqueeBig from '../components/Marquee/Big';

type Props = {
  children: React.ReactNode;
};
function MainLayout({ children }: Props) {
  return (
    <main>
      <Container size={'xl'} w={'100%'} py={'lg'}>
        <Header />
        {children}
      </Container>
      <MarqueeBig />
      <Footer />
    </main>
  );
}

export default MainLayout;
