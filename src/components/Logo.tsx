import { Group, Title } from '@mantine/core';

function Logo() {
  return (
    <Group align='flex-end' gap={'lg'} mb={'md'} wrap='wrap'>
      <img src={'./logo.gif'} alt='logo' width={128} />
      <Title size={32} ta='center' lts={'0.3rem'} mb={'xs'} lh={0.5}>
        <s>Dither</s>
        <Title size={'75%'} component={'span'} ff={'text'} lts={'0'} ml={12}>
          my stuff
        </Title>
      </Title>
    </Group>
  );
}

export default Logo;
