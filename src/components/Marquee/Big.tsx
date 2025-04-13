import { Marquee } from '@gfazioli/mantine-marquee';
import { Box, Title, useMantineColorScheme } from '@mantine/core';

function MarqueeBig() {
  const { colorScheme } = useMantineColorScheme();
  const prashes = [
    'is cool',
    'is awesome',
    'is great',
    'is wonderful',
    'is amazing',
    'is fantastic',
    'is trash',
    'is crap',
    'is shit',
    'is fucking shit',
    'is fucking trash',
  ];
  return (
    <Box pos={'fixed'} bottom={64} left={0} right={0} style={{ zIndex: -1 }}>
      <Marquee w={'100%'} pauseOnHover duration={60}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Box key={i} flex={1}>
            <Title
              size={42}
              opacity={0.3}
              c={colorScheme === 'dark' ? 'clay' : 'brass'}
              style={{ whiteSpace: 'nowrap' }}>
              Dither{' '}
              <Title size='inherit' component={'span'} ff={'text'}>
                <s>{prashes[i % prashes.length]}</s>
              </Title>
            </Title>
          </Box>
        ))}
      </Marquee>
    </Box>
  );
}

export default MarqueeBig;
