import { Flex, Text, HStack, Avatar } from '@chakra-ui/react'
import { RiUser3Fill } from 'react-icons/ri';

export function Header() {
  return (
    <Flex
      as='header'
      w='100%'
      maxW={1480}
      h='20'
      mx='auto'
      mt='4'
      px='6'
      align='center'
    >
      <Text
        fontSize='3xl'
        fontWeight='bold'
        letterSpacing='tight'
        w='64'
      >
        clinicasup
         <Text as='span' ml='1' color='cyan.600'>.</Text>
      </Text>

      <Flex
        align='center'
        ml='auto'
      >
        <HStack spacing='4' mx='8' pr='8' py='1'>
          <Avatar size='md' name='Leonardo Gomes de Almeida' />
          <Text color='gray.900'>
            Olá, Leonardo Gomes de Almeida Silva
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
}