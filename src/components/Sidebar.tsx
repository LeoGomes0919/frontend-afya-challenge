import { Box, Stack, Text, Icon, Image, Link } from "@chakra-ui/react";

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
      // overflowY='scroll'
      height='100%'
      position='fixed'
      bg='cyan.900'
      zIndex={2}
    >
      <Image src='/images/logovert.png' ml='4' />
      <Box display='flex' alignItems='center' mt='0' pb='6'>
        <Stack spacing='6' align='flex-start' flex='1'>
          <Stack spacing='2' mt='8' w='100%'>
            {/* <Link display='flex' href='/dashboard' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiGrid} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Dashboard</Text>
            </Link> */}
            <Link display='flex' href='/clients' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiUsers} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Clientes</Text>
            </Link>
            <Link display='flex' href='/specialists' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiUser} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Especialistas</Text>
            </Link>
            <Link display='flex' href='/attendances' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiCalendar} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Atendimentos</Text>
            </Link>
            <Link display='flex' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiCalendar} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Prontuários</Text>
            </Link>
            {/* <Link display='flex' alignItems='center' color='gray.100' pl='6' py='4' _hover={{ bg: 'cyan.500' }}>
              <Icon as={FiLogOut} fontSize='22' mr='4' />
              <Text fontWeight='medium'>Sair</Text>
            </Link> */}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
