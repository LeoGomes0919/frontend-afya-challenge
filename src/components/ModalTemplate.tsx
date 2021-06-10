import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react'

export function ModalTemplate({ isOpen, onClose, children }) {
  return (
    <Modal size='xl' blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as='form'>
        <ModalHeader>Cadastro de clietes</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button type='submit' colorScheme='blue' mr={3}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
