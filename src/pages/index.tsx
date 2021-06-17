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
        onSubmit={handleSubmit(handleSignIn)}
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
              children={<FiUserCheck size={18} color='#E2E8F0' />}
            />
            <Input
              {...register('username')}
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
              children={<FiLock size={18} color='#E2E8F0' />}
            />
            <Input
              {...register('password')}
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
