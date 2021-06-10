import { Box, Flex } from "@chakra-ui/layout";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export default function Dashboard() {
  return (
    <Flex direction='column'>
      <Header />

      <Flex w='100%' maxWidth={1480} mx='auto' pl='6'>
        <Sidebar />

        <Box
          position='relative'
          left='215px'
          top='70px'
          height='calc(100% - 70px)'
          width='calc(100% - 215px)'
          pt='6'
          px='8'
          pb='16'
          minH='100vh'
        >

        </Box>
      </Flex>
    </Flex>
  );
}
