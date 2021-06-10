import { Stack, Button, Box } from "@chakra-ui/react";

export function Pagination() {
  return (
    <Stack
      direction='row'
      spacing='6'
      mt='8'
      justify='space-between'
      align='center'
    >
      <Box>
        <strong>0</strong> - <strong>5</strong> de <strong>100</strong>
      </Box>
      <Stack direction='row' spacing='2'>
        <Button
          size='sm'
          fontSize='xs'
          colorScheme='cyan'
          disabled
          _disabled={{ bg: 'cyan.500', cursor: 'default' }}
          color='gray.100'
        >
          1
      </Button>

        <Button
          size='sm'
          fontSize='xs'
          width='4'
          bg='cyan.700'
          _hover={{ bg: 'cyan.500' }}
          color='gray.100'
        >
          2
      </Button>

        <Button
          size='sm'
          fontSize='xs'
          width='4'
          bg='cyan.700'
          _hover={{ bg: 'cyan.500' }}
          color='gray.100'
        >
          3
      </Button>

        <Button
          size='sm'
          fontSize='xs'
          width='4'
          bg='cyan.700'
          _hover={{ bg: 'cyan.500' }}
          color='gray.100'
        >
          4
      </Button>
      </Stack>
    </Stack>
  );
}
