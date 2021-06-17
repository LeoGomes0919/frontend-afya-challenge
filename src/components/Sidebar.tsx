import { Box, Stack, Text, Icon, Avatar, Link } from "@chakra-ui/react";

import { FiGrid, FiUsers, FiUser, FiCalendar, FiLogOut } from 'react-icons/fi';

export function Sidebar() {
  return (
    <Box
      as='aside'
      w='240px'
      left='0'
      top='16'
      bottom='0'
      overflow='auto'
      height='100%'
      position='fixed'
      bg='cyan.900'
    >
      <Box display='flex' alignItems='center' mt='4' pb='6'>
        <Stack spacing='6' align='flex-start' flex='1'>
          <Avatar name='Clinica Superação' src='/images/logo-mini.svg' bg='transparent' size='2xl' ml='6' />

          <Stack spacing='2' mt='8' w='100%'>
            <Link display='flex' href='/dashboard' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiGrid} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Dashboard</Text>
            </Link>
            <Link display='flex' href='/clients' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiUsers} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Clientes</Text>
            </Link>
            <Link display='flex' href='/specialists' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiUser} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Especialistas</Text>
            </Link>
            <Link display='flex' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiCalendar} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Atendimentos</Text>
            </Link>
            <Link display='flex' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiCalendar} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Prontuários</Text>
            </Link>
            <Link display='flex' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiLogOut} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Sair</Text>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
