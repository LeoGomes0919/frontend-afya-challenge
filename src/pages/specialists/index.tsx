import { useState, useEffect } from 'react';
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
  SimpleGrid,
  TableCaption,
  Text
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import { Header } from "../../components/Header";
import { ModalTemplate } from "../../components/ModalTemplate";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { cpfMask, phoneMask } from '../../providers';
import { api } from '../../services/api';

interface ClientProps {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  cellphone: string;
  email: string;
  blood_type: string;
}

export default function Specialist() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [specialists, setSpecialists] = useState<ClientProps[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [telephone, setTelephone] = useState('');
  const [cell, setCell] = useState('');

  async function handleRegisterClient(data) {
    console.log(data);
  }

  function resetForm() {
    reset();
    setTelephone('');
    setCell('');
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
            <Heading size='lg' fontWeight='normal'>Especialistas</Heading>
            <Button
              cursor='pointer'
              as='a'
              size='sm'
              fontSize='sm'
              leftIcon={<Icon as={FiUserPlus} />}
              onClick={onOpen}
            >
              Cadastrar especialistas
            </Button>
          </Flex>
          <Divider />

          <Table variant='striped' mt='20' colorScheme='cyan' resize='horizontal'>
            <TableCaption>{!specialists.length ? 'Sem specialistas cadastrados.' : ''}</TableCaption>
            < Thead >
              <Tr>
                <Th>NOME</Th>
                <Th>CPF</Th>
                <Th>TELEFONE</Th>
                <Th>CELULAR</Th>
                <Th>EMAIL</Th>
                <Th>AÇÕES</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={14}>

            </Tbody>
          </Table>
          {/* <Pagination /> */}
          <ModalTemplate
            isOpen={isOpen}
            onClose={onClose}
            title='Cadastro de Clientes'
            handleAction={handleSubmit(handleRegisterClient)}
            reset={resetForm}
          >
            <Stack spacing='4'>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <FormControl>
                  <FormLabel mb='1'>Nome</FormLabel>
                  <Input
                    aria-invalid={errors.name ? 'true' : 'false'}
                    {...register('name', { required: true })}
                    placeholder='Informe o Nome completo'
                    name='name'
                  />
                  {errors.name && (
                    <Text color='red' fontSize='xs'>
                      Nome é obrigatório.
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel mb='1'>Num. Registro</FormLabel>
                  <Input
                    aria-invalid={errors.register ? 'true' : 'false'}
                    {...register('cpf', { required: true })}
                    placeholder='Informe o CPF'
                    name='register'
                    maxLength={14}
                  />
                  {errors.register && (
                    <Text color='red' fontSize='xs'>
                      Numero do registro é obrigatório.
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <FormControl>
                  <FormLabel mb='1'>Telefone</FormLabel>
                  <Input
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    {...register('phone', { required: true })}
                    placeholder='Informe o Telefone'
                    name='phone'
                    value={telephone}
                    maxLength={15}
                    onChange={(e) => setTelephone(phoneMask(e.target.value))}
                  />
                  {errors.phone && (
                    <Text color='red' fontSize='xs'>
                      Telefone é obrigatório.
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel mb='1'>Celular</FormLabel>
                  <Input
                    aria-invalid={errors.cellphone ? 'true' : 'false'}
                    {...register('cellphone', { required: true })}
                    placeholder='Informe o Celular'
                    name='cellphone'
                    maxLength={15}
                    value={cell}
                    onChange={(e) => setCell(phoneMask(e.target.value))}
                  />
                  {errors.cellphone && (
                    <Text color='red' fontSize='xs'>
                      Celular é obrigatório.
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={1}>
                <FormControl>
                  <FormLabel mb='1'>E-mail</FormLabel>
                  <Input
                    {...register('email')}
                    placeholder='Informe o E-mail'
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
