import { useContext } from 'react';
import { Flex, Text, HStack, Avatar, Image } from '@chakra-ui/react'
import { AuthContext } from '../contexts/AuthContext';

export function Header() {
  const { user } = useContext(AuthContext);
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
      <Flex
        align='center'
        ml='auto'
      >
        <Avatar size='md' name={user?.name} bg='cyan.800' color='white' />
      </Flex>
    </Flex>
  );
}
