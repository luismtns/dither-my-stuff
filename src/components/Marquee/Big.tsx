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
    <Box pos={'fixed'} bottom={'10vh'} left={0} right={0} style={{ zIndex: -1 }}>
      <Marquee w={'100%'} pauseOnHover duration={90} gap='3rem'>
        {Array.from({ length: 20 }).map((_, i) => (
          <Box key={i} flex={1}>
            <Title
              size={'4rem'}
              opacity={0.3}
              c={colorScheme === 'dark' ? 'clay' : 'brass'}
              style={{ whiteSpace: 'nowrap' }}
              lh={0.5}
              lts={'0.3rem'}>
              Dither{' '}
              <Title size='inherit' component={'span'} lts={0} ff={'text'}>
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
