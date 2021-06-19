import { RefObject } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import { FocusableElement } from "@chakra-ui/utils";
import { FieldValues, UseFormReset } from 'react-hook-form';

interface ModalProps {
  isOpen: boolean;
  disabled?: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  handleAction?: () => void
  reset?: UseFormReset<FieldValues>;
  initialFocusRef?: RefObject<FocusableElement>
}

export function ModalTemplate({
  isOpen,
  disabled = false,
  onClose,
  children,
  title,
  handleAction,
  reset,
  initialFocusRef
}: ModalProps) {

  function handleCloseModal() {
    reset();
    onClose();
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      size='xl'
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialFocusRef}
    >
      <ModalOverlay />
      <ModalContent as='form' onSubmit={handleAction}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button type='submit' colorScheme='blue' mr={3} disabled={disabled}>
            Salvar
          </Button>
          <Button onClick={() => handleCloseModal()}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
