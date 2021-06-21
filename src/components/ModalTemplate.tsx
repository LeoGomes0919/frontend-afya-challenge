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
  loading?: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  handleAction?: () => void
  size?: 'xl' | (string & {}) | 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
}

export function ModalTemplate({
  isOpen,
  loading,
  onClose,
  children,
  title,
  handleAction,
  size
}: ModalProps) {

  return (
    <Modal
      closeOnOverlayClick={false}
      size={!size ? 'xl' : size}
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
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
          <Button
            type='submit'
            colorScheme='blue'
            mr={3}
            isLoading={loading}
            fontWeight='normal'
          >
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
