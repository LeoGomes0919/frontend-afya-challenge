import {
  Flex,
  Input,
  Button,
  Heading,
  Stack,
  Image,
  HStack,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';

import { FiUserCheck, FiLock, FiArrowRight } from 'react-icons/fi';

export default function SignIn() {
  return (
    <Flex
      wi='100vw'
      h='100vh'
      align='center'
      justify='center'
      px='10'
      bg='cyan.900'
    >
      <Stack maxWidth={390} width='100%' spacing='8'>
        <HStack display='flex' align='center' justify='flex-start'>
          <Image src='/images/logo-mini.svg' boxSize={9} />
          <Image src='/images/logo-name.svg' boxSize={20} />
        </HStack>
        <Heading fontSize='50px' size='lg' color='gray.100'>
          Faça seu login na plataforma
        </Heading>
      </Stack>
      <Flex
        as='form'
        width='100%'
        maxWidth={480}
        bg='cyan.800'
        p='16'
        borderRadius={4}
        flexDir='column'
      >
        <Stack spacing='4'>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<FiUserCheck size={18} />}
            />
            <Input
              name='username'
              type='text'
              placeholder='Usuário'
              focusBorderColor='gray.100'
              color='gray.100'
              bgColor='cyan.900'
              variant='filled'
              borderRadius={4}
              _hover={{ bgColor: 'cyan.900' }}
              size='lg'
              isRequired
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<FiLock size={18} />}
            />
            <Input
              name='password'
              type='password'
              placeholder='Senha'
              focusBorderColor='gray.100'
              color='gray.100'
              bgColor='cyan.900'
              variant='filled'
              borderRadius={4}
              _hover={{ bgColor: 'cyan.900' }}
              size='lg'
              isRequired
            />
          </InputGroup>
        </Stack>
        <Button
          type='submit'
          mt='8'
          colorScheme='gray'
          borderRadius={4}
          size='lg'
          _hover={{ bg: 'gray.300' }}
        >ENTRAR</Button>
      </Flex>
    </Flex>
  )
}
