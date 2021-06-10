import { Flex, Text, HStack, Avatar } from '@chakra-ui/react'

export function Header() {
  return (
    <Flex
      as='header'
      w='100%'
      h='70px'
      top='0'
      right='0'
      left='0'
      py='2'
      px='4'
      align='center'
      position='fixed'
      bg='cyan.900'
      zIndex={1}
    >
      <Text
        fontSize='3xl'
        fontWeight='bold'
        letterSpacing='tight'
        w='64'
        color='white'
      >
        clinicasup
         <Text as='span' ml='1' color='gray.100'>.</Text>
      </Text>

      <Flex
        align='center'
        ml='auto'
      >
        <Avatar size='md' name='Leonardo Gomes de Almeida' bg='cyan.800' color='white' />
      </Flex>
    </Flex>
  );
}
