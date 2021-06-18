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
  Text,
  useToast,
  Spinner
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import cep from 'cep-promise';

import { Header } from "../../components/Header";
import { ModalTemplate } from "../../components/ModalTemplate";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { cpfMask, phoneMask } from '../../providers';
import { api } from '../../services/api';

interface AddressProps {
  id: number;
  zip: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface ClientProps {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  cellphone: string;
  email: string;
  blood_type: string;
}

export default function Client() {
  const toast = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [address, setAddress] = useState<AddressProps[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cpf, setCpf] = useState('')
  const [telephone, setTelephone] = useState('');
  const [cell, setCell] = useState('');
  const [zip, setZip] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formateCPF = (value: string) => {
    setCpf(cpfMask(value));
  }

  // async function loadingAddressFromZip(event) {
  //   setZip(event.target.value);
  //   if (zip.length >= 8) {
  //     const response = await cep(zip);
  //     console.log(response);
  //   }
  // }

  async function getClients() {
    const response = await api.get('/clients');

    const client = response.data;
    setClients(client);
  }

  async function handleRegisterClient(data) {
    const {
      name,
      cpf,
      phone,
      cellphone,
      email,
      blood_type,
      zip,
      street,
      neighborhood,
      city,
      state
    } = data;

    const client = {
      name,
      cpf,
      phone,
      cellphone,
      email,
      blood_type,
      address: {
        zip,
        street,
        neighborhood,
        city,
        state
      }
    }

    try {
      await api.post('/clients', client);
      getClients();
      toast({
        description: 'Cliente cadastrado com sucesso!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      reset();
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  function resetForm() {
    reset();
    setCpf('');
    setTelephone('');
    setCell('');
  }

  useEffect(() => {
    getClients();
  }, []);

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
            <TableCaption>{!clients.length ? 'Sem clientes cadastrados.' : ''}</TableCaption>
            < Thead >
              <Tr>
                <Th>NOME</Th>
                <Th>CPF</Th>
                <Th>TELEFONE</Th>
                <Th>CELULAR</Th>
                <Th>EMAIL</Th>
                <Th>TIPO SANG.</Th>
                <Th>AÇÕES</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={14}>
              {clients.map(client => (
                <Tr key={client.id}>
                  <Td>{client.name}</Td>
                  <Td>{client.cpf}</Td>
                  <Td>{client.phone}</Td>
                  <Td>{client.cellphone}</Td>
                  <Td>{client.email}</Td>
                  <Td textAlign='center'>{client.blood_type}</Td>
                  <Td>
                    <HStack spacing='2'>
                      <Tooltip label='Editar' fontSize='small' placement='top'>
                        <IconButton size='sm'
                          variant="outline"
                          colorScheme='cyan'
                          aria-label='Editar'
                          icon={<FiEdit />}
                        />
                      </Tooltip>
                      <Tooltip label='Excluir' fontSize='small' placement='top'>
                        <IconButton size='sm'
                          variant="outline"
                          colorScheme='cyan'
                          aria-label='Excluir'
                          icon={<FiTrash />}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
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
                  <FormLabel mb='1'>CPF</FormLabel>
                  <Input
                    aria-invalid={errors.cpf ? 'true' : 'false'}
                    {...register('cpf', { required: true })}
                    placeholder='Informe o CPF'
                    name='cpf'
                  // maxLength={14}
                  // minLength={14}
                  // value={cpf}
                  // onChange={(e) => formateCPF(e.target.value)}
                  />
                  {errors.cpf && (
                    <Text color='red' fontSize='xs'>
                      CPF é obrigatório.
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
                    maxLength={15}
                  // value={telephone}
                  // onChange={(e) => setTelephone(phoneMask(e.target.value))}
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
                  // value={cell}
                  // onChange={(e) => setCell(phoneMask(e.target.value))}
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

              <Box align='center' content='center' flex='1' bg='cyan.900'>
                <Text fontWeight='bold' color='gray.50'>Endereço</Text>
              </Box>

              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <FormControl>
                  <FormLabel mb='1'>CEP</FormLabel>
                  <Input
                    {...register('zip', { required: true })}
                    aria-invalid={errors.zip ? 'true' : 'false'}
                    placeholder='Informe o CEP'
                    name='zip'
                    type='text'
                  // value={zip}
                  // maxLength={8}
                  // onChange={(event) => loadingAddressFromZip(event)}
                  />
                  {errors.zip && (
                    <Text color='red' fontSize='xs'>
                      CEP é obrigatório.
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel mb='1'>Rua</FormLabel>
                  <Input
                    {...register('street', { required: true })}
                    aria-invalid={errors.street ? 'true' : 'false'}
                    placeholder='Informe a Rua'
                    name='street'
                    type='text'
                  />
                  {errors.street && (
                    <Text color='red' fontSize='xs'>
                      Rua é obrigatório.
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <FormControl>
                  <FormLabel mb='1'>Bairro</FormLabel>
                  <Input
                    {...register('neighborhood', { required: true })}
                    aria-invalid={errors.neighborhood ? 'true' : 'false'}
                    placeholder='Informe o Bairro'
                    name='neighborhood'
                    type='text'
                  />
                  {errors.neighborhood && (
                    <Text color='red' fontSize='xs'>
                      Bairros é obrigatório.
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel mb='1'>Cidade</FormLabel>
                  <Input
                    {...register('city', { required: true })}
                    aria-invalid={errors.city ? 'true' : 'false'}
                    placeholder='Informe a Cidade'
                    name='city'
                    type='text'
                  />
                  {errors.city && (
                    <Text color='red' fontSize='xs'>
                      Cidade é obrigatório.
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={1}>
                <FormControl>
                  <FormLabel mb='1'>Estado</FormLabel>
                  <Input
                    {...register('state', { required: true })}
                    aria-invalid={errors.state ? 'true' : 'false'}
                    placeholder='Informe o Estado'
                    name='state'
                    type='text'
                  />
                  {errors.city && (
                    <Text color='red' fontSize='xs'>
                      Estado é obrigatório.
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>
            </Stack>
          </ModalTemplate>
        </Box>
      </Flex>
    </Box>
  );
}
