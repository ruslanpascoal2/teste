import {
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import PageLayout from "../PageLayout/PageLayout";
import styles from "./Ticket.module.scss";
import codBarrasMocl from "../../assets/img/mockCodBarras.jpg";

interface TicketProps {
  guest?: any;
}

const Ticket = ({guest = "Roberta Medeiros"}: TicketProps) => {
  return (
    <Box>
      <PageLayout>
        <Box pt={5} pb={20}>
          <TicketComponent />
        </Box>
      </PageLayout>
    </Box>
  );
};

const TicketComponent = ({ guest }: TicketProps) => {
  return (
    <Box bg="white" borderRadius={8} p={0} pb={6} border="1px solid lightgray">
      <Stack p={6} pb={2}>
        <Heading size="md" color="primary">
          {guest}
        </Heading>
        <Stack>
          <small>CPF: 123.456.789-00</small>
          <small>Dt. Nasc. 14/12/1997</small>
          <small>Emissão: 14/12/1997</small>
            <HStack>
            <small>Sócio:</small>
          <Text fontSize={12} color="primary">
            Roberto silva
          </Text>
            </HStack>
          <HStack>
            <small>Dependência:</small>
            <Text fontSize={12} color="primary">
              Churrasqueira - G1
            </Text>
          </HStack>
        </Stack>
      </Stack>
      <Box mt={3} w="full" py={3} px={6} bgColor="rgb(79, 125, 161, 0.1)">
        <Flex justifyContent="space-between">
          <Stack spacing={0}>
            <Text fontSize={12} color="gray.500">
              Data limite para uso:
            </Text>
            <Text color="primary" fontSize={20} fontWeight="500">
              31/12/2021
            </Text>
          </Stack>
          <Stack spacing={0}>
            <Text fontSize={12} color="gray.500">
              Código de acesso:
            </Text>
            <Text color="primary" fontSize={20} fontWeight="500">
              !80604239
            </Text>
          </Stack>
        </Flex>
      </Box>
      <Box className={styles.cutMark} w="full">
        <Box my={6} w="full" style={{ border: "2px dashed #C7C7C7" }}></Box>
      </Box>
      <Stack px={6} spacing={3}>
        <Box height="100px" w="full" >
            <img  src={codBarrasMocl} alt=""/>
        </Box>
        <Circle  w="fit-content" alignSelf="center" p={5} bg="#f4f4f4">
          <Icon as={FiDownload} />
        </Circle>
      </Stack>
    </Box>
  );
};

export default Ticket;
