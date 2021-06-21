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
  FormControl,
  FormLabel,
  SimpleGrid,
  TableCaption,
  Select,
  FormErrorMessage,
  Text,
  InputGroup,
  useToast,
  InputRightElement,
  Spinner,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import cep from 'cep-promise';

import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Header } from "../../components/Header";
import { ModalTemplate } from "../../components/ModalTemplate";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { cpfMask, phoneMask } from '../../providers';
import { api } from '../../services/api';
import { Input } from '../../components/Form/Input';

interface AddressProps {
  zip: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface OccupationPros {
  id: number;
  name: string;
}

interface SpecialistProps {
  id: number;
  name: string;
  registry: string;
  phone: string;
  cellphone: string;
  email: string;
  occupation: OccupationPros;
  address: AddressProps;
}


const registerFormShcema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  registry: yup.string().required('Número do Registro é obrigatório'),
  phone: yup.string().required('Telefofne é obrigatório'),
  cellphone: yup.string().required('Celular é obrigatório'),
  occupation: yup.string().required('Profissão é obrigatório'),

  address: yup.object().shape({
    zip: yup.string().required('CEP é obrigatório'),
    street: yup.string().required('Rua é obrigatório'),
    number: yup.string().required('Núme é obrigatório ou informe S/N'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatório'),
    state: yup.string().required('Estado é obrigatório')
  }),
})

export default function Specialist() {
  const { register, handleSubmit, reset, getValues, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(registerFormShcema),
  });
  const toast = useToast();
  const cancelRef = useRef();
  const [specialists, setSpecialists] = useState<SpecialistProps[]>([]);
  const [occupations, setOccupations] = useState<OccupationPros[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState('');
  const [specialistId, setSpecialistId] = useState('');
  const [nameSpecialist, setNameSpecialist] = useState('');
  const [logindGetAddress, setLoadindGetAddress] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

  const onCloseConfirmation = () => setIsOpenConfirmation(false);

  function openConfirmation(id: number, name: string) {
    setIsOpenConfirmation(true);
    setNameSpecialist(name);
    setSpecialistId(id.toString());
  }

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

  async function getSpecialists() {
    try {
      const response = await api.get('/specialists');
      const specialist = response.data.data;
      setSpecialists(specialist);
    } catch (err) {
      console.log(err);
    }
  }

  async function getOccupations() {
    try {
      const occupation = await api.get('/occupations');
      const occupationData = occupation.data.data;
      setOccupations(occupationData);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteSpecialist() {
    try {
      await api.delete(`/specialists/${specialistId}`);
      getSpecialists();
      toast({
        description: 'Especialista deletado com sucesso!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        description: 'Ocorreu um erro ao tentar deletar o especialista!',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
    onCloseConfirmation();
  }

  async function openModalEditSpecialist(id: number, specialistName: string) {
    setAction('EDITING');
    setSpecialistId(id.toString());
    setNameSpecialist(specialistName);
    const specialist = specialists.find(specialis => specialis.id === id);
    const { name, registry, phone, cellphone, email, occupation: {
      id: occupationId
    }, address: {
      zip,
      street,
      number,
      neighborhood,
      city,
      state
    } } = specialist;
    const checkNumber = !!number === false ? 'S/N' : number;
    setValue('name', name);
    setValue('registry', registry);
    setValue('phone', phone);
    setValue('cellphone', cellphone);
    setValue('email', email);
    setValue('occupation', occupationId);

    setValue('address.zip', zip);
    setValue('address.street', street);
    setValue('address.number', checkNumber);
    setValue('address.neighborhood', neighborhood);
    setValue('address.city', city);
    setValue('address.state', state);
    onOpen();
  }

  const handleRegister: SubmitHandler<Omit<SpecialistProps, 'id'>> = async (data) => {
    const { name, registry, phone, cellphone, email, occupation, address, } = data;
    const specialist = {
      name, registry, phone, cellphone, email, occupation, address
    };
    try {
      if (action === 'CREATE') {
        await api.post('/specialists', specialist);
      } else {
        await api.put(`/specialists/${specialistId}`, specialist);
      }
      toast({
        description: `${action === 'CREATE'
          ? 'Especialista cadastrado com sucesso!'
          : 'Dados do especialista alterados com sucesso!'
          }`,
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      reset();
      onClose();
      getSpecialists();
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

  useEffect(() => {
    getSpecialists();
    getOccupations();
  }, []);

  function openModal() {
    onOpen();
    setAction('CREATE');
  }

  function closeModal() {
    onClose();
    reset();
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
              onClick={() => openModal()}
            >
              Cadastrar especialista
            </Button>
          </Flex>
          <Divider />

          <Table variant='striped' mt='20' colorScheme='cyan' resize='horizontal'>
            <TableCaption>{!specialists.length ? 'Sem specialistas cadastrados.' : ''}</TableCaption>
            < Thead >
              <Tr>
                <Th>NOME</Th>
                <Th>NUM. REGISTRO</Th>
                <Th>TELEFONE</Th>
                <Th>CELULAR</Th>
                <Th>EMAIL</Th>
                <Th>AÇÕES</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={14}>
              {specialists.map(specialist => (
                <Tr key={specialist.id}>
                  <Td>{specialist.name}</Td>
                  <Td>{specialist.registry}</Td>
                  <Td>{specialist.phone}</Td>
                  <Td>{specialist.cellphone}</Td>
                  <Td>{specialist.email}</Td>
                  <Td>
                    <HStack spacing='2'>
                      <Tooltip label='Editar' fontSize='small' placement='top'>
                        <IconButton
                          onClick={() => openModalEditSpecialist(specialist.id, specialist.name)}
                          size='sm'
                          variant="outline"
                          colorScheme='cyan'
                          aria-label='Editar'
                          icon={<FiEdit />}
                        />
                      </Tooltip>
                      <Tooltip label='Excluir' fontSize='small' placement='top'>
                        <IconButton
                          onClick={() => openConfirmation(specialist.id, specialist.name)}
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
                  Deseja realmente excluir o especialista <strong>{nameSpecialist.toUpperCase()}</strong> ?
                  <p>Essa operação não tem mais volta.</p>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme='red' mr={3} onClick={() => deleteSpecialist()} fontWeight='normal'>Confirmar</Button>
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
              ? 'Cadastro de Especialista'
              : `Editando cadastro de NOME ESPECIALISTA`
            }
          >
            <Stack spacing='4'>

              <SimpleGrid minChildWidth='240px' spacing='10px' width='100%'>
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
                  name='registry'
                  type='text'
                  label='Núm. Registro'
                  error={errors.registry}
                  placeholder='Informe o Número de Registro'
                  {...register('registry')}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth='240px' spacing='10px' width='100%'>
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
              <SimpleGrid minChildWidth='240px' spacing='10px' width='100%'>
                <FormControl isInvalid={!!errors.occupation}>
                  <FormLabel mb='0.5'>Profissão</FormLabel>
                  <Select
                    placeholder='Selecione uma profissão'
                    {...register('occupation', { required: true })}
                  >
                    {occupations.map(item => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                  {errors.occupation && (
                    <FormErrorMessage>
                      {errors.occupation.message}
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
    </Box>
  );
}
