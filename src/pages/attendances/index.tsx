import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Divider,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  HStack,
  Tooltip,
  IconButton,
  Badge,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  useDisclosure,
  Stack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage
} from '@chakra-ui/react';
import { FiCalendar, FiEdit, FiTrash } from 'react-icons/fi';
import { SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../services/api';
import { formatDate, formatCurrency } from '../../providers';
import { ModalTemplate } from '../../components/ModalTemplate';
import { Input } from '../../components/Form/Input';

enum Status {
  AGENDADO = 'AGENDADO',
  REALIZADO = 'REALIZADO',
  CANCELADO = 'CANCELADO'
}

interface ClientProps {
  id: number;
  name: string;
}

interface SpecialistProps {
  id: number;
  name: string;
}

interface AttendanceProps {
  id: number;
  scheduling_date: Date;
  attendance_date?: Date;
  hour: Date;
  amount: number;
  status: Status;
  client: ClientProps;
  specialist: SpecialistProps;
}

export default function Attendance() {
  const [schedulingDate, setSchedulingDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [status, setStatus] = useState<Status>(Status.AGENDADO);
  const [amount, setAmount] = useState(0);
  const [client, setClient] = useState(0);
  const [specialist, setSpecialist] = useState(0);

  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [attendances, setAttendances] = useState<AttendanceProps[]>([]);
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [specialists, setSpecialists] = useState<SpecialistProps[]>([]);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [nameClient, setNameClient] = useState('');
  const [idAttendance, setIdAttendance] = useState('');
  const [action, setAction] = useState('');
  const cancelRef = useRef();
  const toast = useToast();

  const onCloseConfirmation = () => setIsOpenConfirmation(false);

  function openConfirmation(id: number, name: string) {
    setIsOpenConfirmation(true);
    setNameClient(name);
    setIdAttendance(id.toString());
  }

  async function getAttendances() {
    try {
      const response = await api.get('/attendances');
      const attendance = response.data.data;
      setAttendances(attendance);
    } catch (err) {
      console.log(err);
    }
  }

  function getClientAndSpecialists() {
    Promise.all([
      api.get('/clients'),
      api.get('/specialists')
    ]).then(response => {
      setClients(response[0].data.data);
      setSpecialists(response[1].data.data);
    }).catch(err => console.log(err));
  }

  async function deleteAttendence() {
    try {
      await api.delete(`/attendances/${idAttendance}`);
      getAttendances();
      toast({
        description: 'Atendimento deletado com sucesso!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        description: 'Ocorreu um erro ao tentar deletar o atendimento!',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
    onCloseConfirmation();
  }

  function openModal() {
    onOpen();
    setAction('CREATE');
  }

  function closeModal() {
    reset();
    onClose();
  }

  const handleRegister: SubmitHandler<Omit<AttendanceProps, 'id'>> = async () => {
    const data = {
      scheduling_date: schedulingDate,
      hour,
      status,
      amount,
      clientId: client,
      espcialistId: specialist
    };
    console.log(data);
    // try {
    //   await api.post('/attendances', data);
    //   getAttendances();
    // } catch (err) {
    //   console.log(err);
    // }
  }

  useEffect(() => {
    getAttendances();
    getClientAndSpecialists();
  }, [])

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
          <Flex mb='2' flex='1' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>Atendimentos</Heading>
            <Button
              cursor='pointer'
              as='a'
              size='sm'
              fontSize='sm'
              leftIcon={<Icon as={FiCalendar} />}
              onClick={() => openModal()}
            >
              Novo Atendimento
            </Button>
          </Flex>
          <Divider />

          <Flex flex='1'>
            <Table variant='striped' mt='20' colorScheme='cyan' resize='horizontal'>
              <TableCaption>{!attendances.length && 'Sem atendimentos cadastrados.'}</TableCaption>
              <Thead>
                <Tr>
                  <Th>CLIENTE</Th>
                  <Th>ESPECIALISTA</Th>
                  <Th>AGENDADO</Th>
                  <Th>REALIZADO</Th>
                  <Th>HORÁRIO</Th>
                  <Th>VALOR</Th>
                  <Th>STATUS</Th>
                  <Th>AÇÕES</Th>
                </Tr>
              </Thead>
              <Tbody fontSize={14}>
                {attendances.map(attendance => (
                  <Tr key={attendance.id}>
                    <Td>{attendance.client.name}</Td>
                    <Td>{attendance.specialist.name}</Td>
                    <Td>{attendance.scheduling_date}</Td>
                    <Td>{attendance.attendance_date}</Td>
                    <Td>{attendance.hour}</Td>
                    <Td>R$ {attendance.amount}</Td>
                    <Td>{attendance.status === 'AGENDADO'
                      ? <Badge variant='solid' colorScheme='blue'>{attendance.status}</Badge>
                      : attendance.status === 'REALIZADO'
                        ? <Badge variant='solid' colorScheme='green'>{attendance.status}</Badge>
                        : <Badge variant='solid' colorScheme='red'>{attendance.status}</Badge>}
                    </Td>
                    <Td>
                      <HStack spacing='2'>
                        <Tooltip label='Editar' fontSize='small' placement='top'>
                          <IconButton
                            // onClick={() => openModalEditSpecialist(specialist.id, specialist.name)}
                            size='sm'
                            variant="outline"
                            colorScheme='cyan'
                            aria-label='Editar'
                            icon={<FiEdit />}
                          />
                        </Tooltip>
                        <Tooltip label='Excluir' fontSize='small' placement='top'>
                          <IconButton
                            onClick={() => openConfirmation(attendance.id, attendance.client.name)}
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
          </Flex>

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
                  Deseja realmente excluir o atendimento de <strong>{nameClient.toUpperCase()}</strong> ?
                  <p>Essa operação não tem mais volta.</p>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme='red' mr={3}
                    onClick={() => deleteAttendence()}
                    fontWeight='normal'>Confirmar</Button>
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
              ? 'Novo Atendimento'
              : `Editando atendimento de ${nameClient.toUpperCase()}`
            }
          >
            <Stack spacing='4'>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <DatePicker
                  customInput={<Input
                    name='scheduling_date'
                    label='Data'
                  />}
                  selected={schedulingDate}
                  onChange={(date) => setSchedulingDate(date)}
                  locale="pt-BR"
                  dateFormat="dd/MM/yyyy"
                  required
                />

                <DatePicker
                  customInput={<Input
                    name='hour'
                    label='Horário'
                  />}
                  selected={hour}
                  onChange={(date) => setHour(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  locale="pt-BR"
                  dateFormat="hh:mm:ss"
                  required
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing='10px' w='100%'>
                <FormControl>
                  <FormLabel mb='0.5'>Cliente</FormLabel>
                  <Select
                    placeholder='Selecione um Cliente'
                    required
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  >
                    {clients.map(item => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel mb='0.5'>Especialista</FormLabel>
                  <Select
                    placeholder='Selecione um Especialista'
                    required
                    value={specialist}
                    onChange={(e) => setSpecialist(e.target.value)}
                  >
                    {specialists.map(item => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </SimpleGrid>
              <SimpleGrid minChildWidth='240px' spacing="10px" w='100%'>
                <FormControl>
                  <FormLabel mb='0.5'>Status</FormLabel>
                  <Select
                    disabled
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {Object.keys(Status).map(key => (
                      <option
                        key={Status[key]}
                        value={Status[key]}
                      >
                        {Status[key]}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Input
                  name='amount'
                  label='Valor'
                  type='number'
                  placeholder='Informe o valor'
                  isRequired
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </SimpleGrid>
            </Stack>
          </ModalTemplate>
        </Box>
      </Flex>
    </Box>
  );
}
