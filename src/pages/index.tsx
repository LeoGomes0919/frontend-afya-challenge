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
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { FiUserCheck, FiLock } from 'react-icons/fi';
import { AuthContext } from '../contexts/AuthContext';

export default function SignIn() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    setIsLoading(true);
    try {
      await signIn(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
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
          <Image src='/images/logo.png' />
          {/* <Image src='/images/logo-name.svg' boxSize={20} /> */}
        </HStack>
        <Heading display='flex' flex='1' flexDir='column' border='2px' fontSize='50px' size='xl' color='gray.100' alignItems='flex-end'justify='flex-end'>
            <Text display='flex'>faça seu <Text ml='4'>login</Text></Text>
            <Text fontWeight='normal'>na plataforma</Text>
        </Heading>
      </Stack>
      <Flex
        onSubmit={handleSubmit(handleSignIn)}
        as='form'
        width='100%'
        maxWidth={550}
        border='2px'
        borderColor='cyan.400'
        p='16'
        borderRadius={20}
        position='relative'
        roundedTopLeft={100}
        roundedBottomEnd={100}
        flexDir='column'
      >
        <Image src='/images/logincircle.png' width={100} position='absolute' top='-10' right='-10'/>
        <Stack spacing='4'>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<FiUserCheck size={18} color='#E2E8F0' />}
            />
            <Input
              {...register('username')}
              name='username'
              type='text'
              placeholder='Usuário'
              focusBorderColor='gray.400'
              color='cyan.900'
              bgColor='white'
              variant='filled'
              borderRadius={4}
              _hover={{ bgColor: 'white' }}
              _focus={{ bgColor: 'white' }}
              _placeholder={{ color: 'gray.500' }}
              size='lg'
              isRequired
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<FiLock size={18} color='#E2E8F0' />}
            />
            <Input
              {...register('password')}
              name='password'
              type='password'
              placeholder='Senha'
              focusBorderColor='gray.100'
              color='gray.100'
              bgColor='white'
              variant='filled'
              borderRadius={4}
              _hover={{ bgColor: 'white' }}
              _focus={{ bgColor: 'white' }}
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
          borderRadius={4}
          size='lg'
          _hover={{ bg: 'gray.300' }}
        >
          {isLoading
            ? <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.50'
              color='cyean.900'
              size='md'
            />
            : 'ENTRAR'
          }
        </Button>
      </Flex>
    </Flex>
  )
}
