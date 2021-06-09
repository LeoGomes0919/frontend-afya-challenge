import { Box, Stack, Text, Icon, HStack, Avatar } from "@chakra-ui/react";

import { FiUsers, FiUser, FiCalendar, FiClipboard } from 'react-icons/fi';

export function Sidebar() {
  return (
    <Box as='aside' w='64' mr='8'>
      <Box>
        <Stack>
          <Avatar name='Clinica Superação' size='xl' />
        </Stack>
      </Box>
    </Box>
  );
}