import { Flex, Input, Button, Divider, Heading, Stack, FormLabel, FormControl, } from '@chakra-ui/react';

export default function SignIn() {
  return (
    <Flex
      wi='100vw'
      h='100vh'
      align='center'
      justify='center'
    >
      <Flex
        as='form'
        width='100%'
        maxWidth={360}
        bg='cyan.500'
        p='8'
        borderRadius={8}
        flexDir='column'
      >
        <Heading
          textAlign='center'
          width='100%'
          fontSize='x-large'
        >
          Clinica Superação
        </Heading>
        <Divider mt='4' mb='9' />
        <Stack spacing='4'>
          <FormControl>
            <FormLabel
              htmlFor='username'
              color='gray.50'
            >
              Usuário
            </FormLabel>
            <Input
              name='username'
              id='username'
              type='text'
              focusBorderColor='cyan.700'
              bgColor='cyan.600'
              variant='filled'
              borderRadius={4}
              _hover={{ bgColor: 'cyan.700' }}
              size='lg'
            />
          </FormControl>

          <FormControl>
            <FormLabel
              htmlFor='password'
              color='gray.50'
            >
              Senha
            </FormLabel>
            <Input
              name='password'
              id='password'
              type='password'
              focusBorderColor='cyan.700'
              bgColor='cyan.600'
              variant='filled'
              borderRadius={4}
              _hover={{ bgColor: 'cyan.700' }}
              size='lg'
            />
          </FormControl>
        </Stack>
        <Button
          type='submit'
          mt='6'
          colorScheme='gray'
          borderRadius={4}
          size='lg'
        >Entrar</Button>
      </Flex>
    </Flex>

  )
}
