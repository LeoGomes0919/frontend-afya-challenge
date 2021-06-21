import { useContext, useState } from 'react';
import {
  Flex,
  Input,
  Button,
  Heading,
  Stack,
  Image,
  HStack,
  InputGroup,
  InputLeftElement,
  Text,
  Spinner,
  Divider,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { FiUserCheck, FiLock } from 'react-icons/fi';
import { AuthContext } from '../contexts/AuthContext';

export default function SignIn() {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    try {
      setIsLoading(true);
      await signIn(data);
    } catch (err) {
      toast({
        description: 'Usuário ou senha incorreto.',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  }

  return (
    <Flex
      wi='100vw'
      h='100vh'
      align='center'
      justify='center'
      px='10'
      bg='cyan.900'
    >
      <Stack maxWidth={500} width='100%' spacing='8' pr='10'>
        <HStack display='flex' align='center' justify='flex-end'>
          <Image src='/images/logo.png' width={300} />
        </HStack>
        <Divider />
        <Heading
          display='flex'
          flex='1'
          flexDir='column'
          fontSize='50px'
          size='xl'
          color='gray.100'
          alignItems='flex-end'
          justify='flex-end'
        >
          <Text
            display='flex'
            fontWeight='thin'
            fontSize='40px'
          >faça seu <Text ml='4' fontWeight='bold' fontSize='50px'>login</Text></Text>
          <Text fontWeight='thin' fontSize='40px'>na plataforma</Text>
        </Heading>
      </Stack>
      <Flex
        onSubmit={handleSubmit(handleSignIn)}
        as='form'
        width='100%'
        maxWidth={550}
        border='1px'
        borderColor='cyan.800'
        p='16'
        borderRadius={20}
        position='relative'
        roundedTopLeft={100}
        roundedBottomEnd={100}
        flexDir='column'
      >
        <Image
          src='/images/logincircle.svg'
          border='1px'
          borderColor='cyan.700'
          borderRadius={50}
          position='absolute'
          top='-5'
          right='-5'
          bg='cyan.700'
        />
        <Stack spacing='4'>
          <InputGroup>
            <InputLeftElement paddingLeft='2'
              pointerEvents='none'
              children={<FiUserCheck size={25} color='#005765' />}
            />
            <Input
              {...register('username')}
              name='username'
              type='text'
              placeholder='usuário'
              color='cyan.900'
              bgColor='white'
              variant='filled'
              borderRadius={0}
              _hover={{ bgColor: 'white' }}
              _focus={{ bgColor: 'white', border: '2px solid #21C6B7' }}
              _placeholder={{ color: 'gray.500' }}
              size='lg'
              isRequired
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement paddingLeft='2'
              pointerEvents='none'
              children={<FiLock size={25} color='#005765' />}
            />
            <Input
              {...register('password')}
              name='password'
              type='password'
              placeholder='senha'
              focusBorderColor='#21C6B7'
              color='cyan.900'
              bgColor='white'
              variant='filled'
              borderRadius={0}
              _hover={{ bgColor: 'white' }}
              _focus={{ bgColor: 'white', border: '2px solid #21C6B7' }}
              _placeholder={{ color: 'gray.500' }}
              size='lg'
              isRequired
            />
          </InputGroup>
        </Stack>
        <Button
          type='submit'
          disabled={isLoading ?? true}
          mt='8'
          colorScheme='gray'
          bg='#21C6B7'
          borderRadius={4}
          color='gray.50'
          size='lg'
          fontWeight='normal'
          _hover={{ bg: 'gray.300', color: '#005765' }}
        >
          {isLoading
            ? <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.50'
              color='cyan.900'
              size='md'
            />
            : 'entrar'
          }
        </Button>
      </Flex>
    </Flex>
  )
}
