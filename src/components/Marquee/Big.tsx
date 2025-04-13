import { Marquee } from '@gfazioli/mantine-marquee';
import { Box, Title } from '@mantine/core';

function MarqueeBig() {
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
    <Marquee w={'100%'} pauseOnHover duration={60}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Box key={i} flex={1}>
          <Title style={{ whiteSpace: 'nowrap' }}>
            Dither{' '}
            <Title component={'span'} ff={'text'}>
              <s>{prashes[i % prashes.length]}</s>
            </Title>
          </Title>
        </Box>
      ))}
    </Marquee>
  );
}

export default MarqueeBig;
