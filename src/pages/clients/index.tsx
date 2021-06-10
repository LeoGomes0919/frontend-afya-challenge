import { useState } from 'react';
import {
  Box,
  Flex,
  Divider,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  IconButton,
  Tooltip,
  Stack,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid
} from "@chakra-ui/react";
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import { Header } from "../../components/Header";
import { ModalTemplate } from "../../components/ModalTemplate";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { cpfMask, phoneMask } from '../../providers';

export default function ClienList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cpf, setCpf] = useState('')
  const [telephone, setTelephone] = useState('');
  const [cell, setCell] = useState('');

  const formateCPF = (value: string) => {
    setCpf(cpfMask(value));
  }

  return (
    <Box>
      <Header />

      <Flex w='100%' h='100%' maxWidth={1480} mx='auto' pl='6'>
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
          <Flex mb='2' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>Clientes</Heading>
            <Button
              cursor='pointer'
              as='a'
              size='sm'
              fontSize='sm'
              leftIcon={<Icon as={FiUserPlus} />}
              onClick={onOpen}
            >
              Cadastrar cliente
            </Button>
          </Flex>
          <Divider />

          <Table variant='striped' mt='20' colorScheme='cyan' resize='horizontal'>
            <Thead>
              <Tr>
                <Th>NOME</Th>
                <Th>TELEFONE</Th>
                <Th>CELULAR</Th>
                <Th>EMAIL</Th>
                <Th>TIPO SANGUÍNEO</Th>
                <Th>AÇÕES</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Leonardo Gomes</Td>
                <Td>62 99531-0995</Td>
                <Td>62 99531-0995</Td>
                <Td>leonardogs0919@gmail.com</Td>
                <Td>O-</Td>
                <Td>
                  <HStack spacing='2'>
                    <Tooltip label='Editar' fontSize='small' placement='top'>
                      <IconButton size='sm'
                        variant="outline"
                        colorScheme='orange'
                        aria-label='Editar'
                        icon={<FiEdit />}
                      />
                    </Tooltip>
                    <Tooltip label='Excluir' fontSize='small' placement='top'>
                      <IconButton size='sm'
                        variant="outline"
                        colorScheme='red'
                        aria-label='Excluir'
                        icon={<FiTrash />}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>Leonardo Gomes</Td>
                <Td>62 99531-0995</Td>
                <Td>62 99531-0995</Td>
                <Td>leonardogs0919@gmail.com</Td>
                <Td>O-</Td>
                <Td>
                  <HStack spacing='2'>
                    <Tooltip label='Editar' fontSize='small' placement='top'>
                      <IconButton size='sm'
                        variant="outline"
                        colorScheme='orange'
                        aria-label='Editar'
                        icon={<FiEdit />}
                      />
                    </Tooltip>
                    <Tooltip label='Excluir' fontSize='small' placement='top'>
                      <IconButton size='sm'
                        variant="outline"
                        colorScheme='red'
                        aria-label='Excluir'
                        icon={<FiTrash />}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>Leonardo Gomes</Td>
                <Td>62 99531-0995</Td>
                <Td>62 99531-0995</Td>
                <Td>leonardogs0919@gmail.com</Td>
                <Td>O-</Td>
                <Td>
                  <HStack spacing='2'>
                    <Tooltip label='Editar' fontSize='small' placement='top'>
                      <IconButton size='sm'
                        variant="outline"
                        colorScheme='orange'
                        aria-label='Editar'
                        icon={<FiEdit />}
                      />
                    </Tooltip>
                    <Tooltip label='Excluir' fontSize='small' placement='top'>
                      <IconButton size='sm'
                        variant="outline"
                        colorScheme='red'
                        aria-label='Excluir'
                        icon={<FiTrash />}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>Leonardo Gomes</Td>
                <Td>62 99531-0995</Td>
                <Td>62 99531-0995</Td>
                <Td>leonardogs0919@gmail.com</Td>
                <Td>O-</Td>
                <Td>
                  <HStack spacing='2'>
                    <Tooltip label='Editar' fontSize='small' placement='top'>
                      <IconButton size='sm'
                        variant="outline"
                        colorScheme='orange'
                        aria-label='Editar'
                        icon={<FiEdit />}
                      />
                    </Tooltip>
                    <Tooltip label='Excluir' fontSize='small' placement='top'>
                      <IconButton size='sm'
                        variant="outline"
                        colorScheme='red'
                        aria-label='Excluir'
                        icon={<FiTrash />}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>Leonardo Gomes</Td>
                <Td>62 99531-0995</Td>
                <Td>62 99531-0995</Td>
                <Td>leonardogs0919@gmail.com</Td>
                <Td>O-</Td>
                <Td>
                  <HStack spacing='2'>
                    <Tooltip label='Editar' fontSize='small' placement='top'>
                      <IconButton size='sm'
                        variant="outline"
                        colorScheme='orange'
                        aria-label='Editar'
                        icon={<FiEdit />}
                      />
                    </Tooltip>
                    <Tooltip label='Excluir' fontSize='small' placement='top'>
                      <IconButton size='sm'
                        variant="outline"
                        colorScheme='red'
                        aria-label='Excluir'
                        icon={<FiTrash />}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
          <ModalTemplate isOpen={isOpen} onClose={onClose}>
            <Stack spacing='4'>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <FormControl>
                  <FormLabel mb='1'>Nome</FormLabel>
                  <Input placeholder='Informe o Nome completo' isRequired name='name' />
                </FormControl>
                <FormControl>
                  <FormLabel mb='1'>CPF</FormLabel>
                  <Input
                    placeholder='Informe o CPF'
                    isRequired
                    name='cpf'
                    maxLength={14}
                    value={cpf}
                    onChange={(e) => formateCPF(e.target.value)}
                  />
                </FormControl>
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <FormControl>
                  <FormLabel mb='1'>Telefone</FormLabel>
                  <Input
                    placeholder='Informe o Telefone'
                    name='telephone'
                    value={telephone}
                    maxLength={15}
                    onChange={(e) => setTelephone(phoneMask(e.target.value))}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel mb='1'>Celular</FormLabel>
                  <Input
                    placeholder='Informe o Celular'
                    isRequired
                    name='cell'
                    maxLength={15}
                    value={cell}
                    onChange={(e) => setCell(phoneMask(e.target.value))}
                  />
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={1}>
                <FormControl>
                  <FormLabel mb='1'>E-mail</FormLabel>
                  <Input
                    placeholder='Informe o E-mail'
                    isRequired
                    name='email'
                    type='email'
                  />
                </FormControl>
              </SimpleGrid>
            </Stack>
          </ModalTemplate>
        </Box>
      </Flex>
    </Box>
  );
}
