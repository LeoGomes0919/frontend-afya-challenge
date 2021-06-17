import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react'
import { FieldValues, UseFormReset } from 'react-hook-form';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  handleAction?: () => void
  reset?: UseFormReset<FieldValues>;
}

export function ModalTemplate({ isOpen, onClose, children, title, handleAction, reset }: ModalProps) {

  function handleCloseModal() {
    reset();
    onClose();
  }

  return (
    <Modal closeOnOverlayClick={false} size='xl' blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as='form' onSubmit={handleAction}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button type='submit' colorScheme='blue' mr={3}>
            Salvar
          </Button>
          <Button onClick={() => handleCloseModal()}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
