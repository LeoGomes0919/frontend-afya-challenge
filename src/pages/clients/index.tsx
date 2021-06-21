import { useState, useEffect, useRef } from 'react';
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
  SimpleGrid,
  TableCaption,
  Text,
  useToast,
  Spinner,
  FormControl,
  FormLabel,
  Select,
  InputGroup,
  InputRightElement,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  FormErrorMessage
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import cep from 'cep-promise';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from "../../components/Header";
import { ModalTemplate } from "../../components/ModalTemplate";
import { Sidebar } from "../../components/Sidebar";
import { cpfMask, phoneMask } from '../../providers';
import { api } from '../../services/api';
import { Input } from '../../components/Form/Input';

enum BloodType {
  AP = 'A+',
  AN = 'A-',
  BP = 'B+',
  BN = 'B-',
  OP = 'O+',
  ON = 'O-',
  ABP = 'AB+',
  ABN = 'AB-'
}

interface AddressProps {
  zip: string;
  street: string;
  number: string;
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
  blood_type: BloodType;
  address: AddressProps;
}

const registerFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  phone: yup.string().required('Telefofne é obrigatório'),
  cellphone: yup.string().required('Celular é obrigatório'),
  blood_type: yup.string().required('Tipo sanguíneo é obrigatório'),

  address: yup.object().shape({
    zip: yup.string().required('CEP é obrigatório'),
    street: yup.string().required('Rua é obrigatório'),
    number: yup.string().required('Núme é obrigatório ou informe S/N'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatório'),
    state: yup.string().required('Estado é obrigatório')
  }),
});

export default function Client() {
  const { register, handleSubmit, setValue, getValues, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(registerFormSchema)
  });
  const [clients, setClients] = useState<ClientProps[]>([]);
  const toast = useToast();
  const cancelRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logindGetAddress, setLoadindGetAddress] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [idClient, setIdClient] = useState('');
  const [action, setAction] = useState('');
  const [nameClient, setNameClient] = useState('');

  const onCloseConfirmation = () => setIsOpenConfirmation(false);

  async function loadingAddressFromZip() {
    const zipCode = getValues('address.zip');
    try {
      if (zipCode.length >= 8) {
        setLoadindGetAddress(true);
        const response = await cep(zipCode, { timeout: 5000, providers: ['viacep'] });
        const { state, city, neighborhood, street } = response;
        setValue('address.state', state);
        setValue('address.city', city);
        setValue('address.neighborhood', neighborhood);
        setValue('address.street', street);
      }
    } catch (err) {
      toast({
        description: `${err.errors[0].message}`,
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      setValue('address.state', '');
      setValue('address.city', '');
      setValue('address.neighborhood', '');
      setValue('address.street', '');
    }
    setLoadindGetAddress(false);
  }

  async function getClients() {
    const response = await api.get(`/clients`);

    const { data } = response.data;
    setClients(data);
  }

  function openConfirmation(id: string, name: string) {
    setIsOpenConfirmation(true);
    setNameClient(name);
    setIdClient(id);
  }

  async function deleteClient() {
    try {
      await api.delete(`/clients/${idClient}`);
      getClients();
      toast({
        description: 'Cliente deletado com sucesso!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        description: 'Ocorreu um erro ao tentar deletar o cliente!',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
    onCloseConfirmation();
  }

  async function openModalEditClient(id: number, clientName: string) {
    setAction('EDITING');
    setIdClient(id.toString());
    setNameClient(clientName);
    const client = clients.find(client => client.id === id);
    const { name, cpf, phone, cellphone, blood_type, email, address: {
      zip,
      street,
      number,
      neighborhood,
      city,
      state
    } } = client;
    setValue('name', name);
    setValue('cpf', cpf);
    setValue('phone', phone);
    setValue('cellphone', cellphone);
    setValue('blood_type', blood_type);
    setValue('email', email);

    setValue('address.zip', zip);
    setValue('address.street', street);
    setValue('address.number', number);
    setValue('address.neighborhood', neighborhood);
    setValue('address.city', city);
    setValue('address.state', state);
    onOpen();
  }

  const handleRegister: SubmitHandler<Omit<ClientProps, 'id'>> = async (data) => {
    const { name, cpf, phone, cellphone, email, blood_type, address } = data;
    const client = { name, cpf, phone, cellphone, email, blood_type, address };
    try {
      if (action === 'CREATE') {
        await api.post('/clients', client);
      } else {
        await api.put(`/clients/${idClient}`, client);
      }

      toast({
        description: `${action === 'CREATE'
          ? 'Cliente cadastrado com sucesso!'
          : 'Dados do cliente alterados com sucesso!'
          }`,
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      reset();
      onClose();
      getClients();
    } catch (err) {
      toast({
        description: `${err.response.data.message}`,
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function openModal() {
    onOpen();
    setAction('CREATE');
  }

  function closeModal() {
    reset();
    onClose();
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
              onClick={() => openModal()}
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
                          onClick={() => openModalEditClient(client.id, client.name)}
                          variant="outline"
                          colorScheme='cyan'
                          aria-label='Editar'
                          icon={<FiEdit />}
                        />
                      </Tooltip>
                      <Tooltip label='Excluir' fontSize='small' placement='top'>
                        <IconButton
                          onClick={() => openConfirmation(client.id.toString(), client.name)}
                          size='sm'
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
          <AlertDialog
            isOpen={isOpenConfirmation}
            leastDestructiveRef={cancelRef}
            onClose={onCloseConfirmation}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Confirmação
                </AlertDialogHeader>

                <AlertDialogBody>
                  Deseja realmente excluir o cliente <strong>{nameClient.toUpperCase()}</strong> ?
                  <p>Essa operação não tem mais volta.</p>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme='red' mr={3} onClick={() => deleteClient()} fontWeight='normal'>Confirmar</Button>
                  <Button variant='outline' ref={cancelRef} onClick={() => onCloseConfirmation()}>Cancelar</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          <ModalTemplate
            isOpen={isOpen}
            onClose={closeModal}
            loading={isSubmitting}
            handleAction={handleSubmit(handleRegister)}
            title={action === 'CREATE'
              ? 'Cadastro de Clientes'
              : `Editando cadastro de ${nameClient.toUpperCase()}`
            }
          >
            <Stack spacing='4'>

              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <Input
                  name='name'
                  type='text'
                  label='Nome'
                  error={errors.name}
                  placeholder='Informe o Nome Completo'
                  {...register('name')}
                  autoFocus
                />

                <Input
                  name='cpf'
                  type='text'
                  label='CPF'
                  maxLength={14}
                  error={errors.cpf}
                  placeholder='Informe o CPF'
                  {...register('cpf')}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <Input
                  name='phone'
                  type='text'
                  label='Telefone'
                  maxLength={15}
                  error={errors.phone}
                  placeholder='Informe o Telefone'
                  {...register('phone')}
                />

                <Input
                  name='cellphone'
                  type='text'
                  label='Celular'
                  maxLength={15}
                  error={errors.cellphone}
                  placeholder='Informe o Celular'
                  {...register('cellphone')}
                />

              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <FormControl isInvalid={!!errors.blood_type}>
                  <FormLabel mb='0.5'>Tipo Sanguíneo</FormLabel>
                  <Select
                    placeholder='Selecione um tipo'
                    {...register('blood_type', { required: true })}
                  >
                    {Object.keys(BloodType).map(key => (
                      <option
                        key={BloodType[key]}
                        value={BloodType[key]}
                      >
                        {BloodType[key]}
                      </option>
                    ))}
                  </Select>
                  {errors.blood_type && (
                    <FormErrorMessage>
                      {errors.blood_type.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Input
                  name='email'
                  type='email'
                  label='Email'
                  placeholder='Informe o Email'
                  {...register('email')}
                />
              </SimpleGrid>

              <Box align='center' content='center' flex='1' bg='cyan.900'>
                <Text fontWeight='bold' color='gray.50'>Endereço</Text>
              </Box>

              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <InputGroup>
                  <Input
                    name='zip'
                    type='text'
                    label='CEP'
                    maxLength={8}
                    error={errors.address?.zip}
                    placeholder='Informe o CEP'
                    {...register('address.zip')}
                    onBlur={() => loadingAddressFromZip()}
                  />
                  {logindGetAddress && (
                    <InputRightElement mt='6' children={<Spinner size='sm' />} />
                  )}
                </InputGroup>
                <Input
                  name='street'
                  type='text'
                  label='Rua'
                  error={errors.address?.street}
                  placeholder='Informe a Rua'
                  {...register('address.street')}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <Input
                  name='number'
                  type='text'
                  label='Número'
                  error={errors.address?.number}
                  placeholder='Informe o Número'
                  {...register('address.number')}
                />
                <Input
                  name='neighborhood'
                  type='text'
                  label='Bairro'
                  error={errors.address?.neighborhood}
                  placeholder='Informe o Bairro'
                  {...register('address.neighborhood')}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <Input
                  name='city'
                  type='text'
                  label='Cidade'
                  error={errors.address?.city}
                  placeholder='Informe a Cidade'
                  {...register('address.city')}
                />

                <Input
                  name='state'
                  type='text'
                  label='Estado'
                  error={errors.address?.state}
                  placeholder='Informe o Estado'
                  {...register('address.state')}
                />
              </SimpleGrid>

            </Stack>
          </ModalTemplate>
        </Box>
      </Flex>
    </Box >
  );
}
