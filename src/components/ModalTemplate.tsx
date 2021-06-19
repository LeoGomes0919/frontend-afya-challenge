import { RefObject } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner
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
  initialFocusRef?: RefObject<FocusableElement>;
  size?: 'xl' | (string & {}) | 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
}

export function ModalTemplate({
  isOpen,
  disabled = false,
  onClose,
  children,
  title,
  handleAction,
  reset,
  initialFocusRef,
  size
}: ModalProps) {

  function handleCloseModal() {
    reset();
    onClose();
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      size={!size ? 'xl' : size}
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialFocusRef}
      scrollBehavior='inside'
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
            {disabled === true
              ? <Spinner
                thickness='2px'
                speed='0.65s'
                emptyColor='cyan.100'
                color='cyan.900'
                size='md'
              />
              : 'Salvar'
            }
          </Button>
          <Button onClick={() => handleCloseModal()}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
