import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const ImagesComponent = ({ url }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        mr="10px"
        border="1px"
        borderColor="gray.300"
        borderRadius="5px"
        onClick={onOpen}
      >
        <Image w="80px" h="80px" src={url} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Image src={url} w="100%" h="auto" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImagesComponent;
