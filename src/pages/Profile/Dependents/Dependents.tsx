import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Container,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import PageLayout from "../../../components/PageLayout/PageLayout";
import styles from "./Dependents.module.scss";
import { MdOutlineOpenInNew } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ROUTES } from "../../../constants/routes";
import { useRef } from "react";
import Actions from "../../../components/Actions/Actions";
import ActionButton from "../../../components/ActionButton/ActionButton";

const mock = [
  { name: "Marcos Junior", status: "Ativo" },
  { name: "Sonia Abrão", status: "Inativo" },
];


const Dependents = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();

  const handleDeleteDependent = () => {};

  return (
    <PageLayout>
      <Container maxW="container.md" pt={5} pb={20}>
        <Stack spacing={10} className={styles.profileForm}>
          <Breadcrumb
            items={[
              { route: "/", label: "Início" },
              { route: ROUTES.PROFILE, label: "Perfil" },
              { route: ROUTES.DEPENDENTS, label: "Dependentes" },
            ]}
          />

          <Stack spacing={2}>
            <Heading size="md" fontWeight="500" color="primary">
              Meus dependentes
            </Heading>
            <Text color="gray.500">Você pode adicionar até 3 dependentes.</Text>
          </Stack>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Familiares</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {mock.map((m, index) => (
                <tr key={index}>
                  <td style={{ width: "50%" }}>
                    <Text color="gray.600">{m.name}</Text>
                  </td>
                  <td>
                    <Text
                      fontWeight="500"
                      color={m.status === "Ativo" ? "success" : "#ec7272"}
                    >
                      {m.status}
                    </Text>
                  </td>
                  <td>
                    <HStack>
                      <RouterLink to={ROUTES.DEPENDENT_EDIT}>
                        <Icon
                          fontSize={20}
                          color="gray.500"
                          as={MdOutlineOpenInNew}
                        />
                      </RouterLink>
                      <Link onClick={onOpen}>
                        <Icon
                          fontSize={20}
                          color="gray.500"
                          as={AiOutlineCloseCircle}
                        />
                      </Link>
                    </HStack>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Actions>
            <RouterLink to={ROUTES.PROFILE}>
              <ActionButton variant="outline">Voltar</ActionButton>
            </RouterLink>
            {mock.length >= 3 ? (
              <></>
            ) : (
              <RouterLink to={ROUTES.DEPENDENT_REGISTER}>
                <ActionButton>Adicionar dependente</ActionButton>
              </RouterLink>
            )}
          </Actions>
        </Stack>
        <AlertDialog
          size='xs'
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Cancelar dependente
                <AlertDialogCloseButton />
              </AlertDialogHeader>

              <AlertDialogBody py={10}>
                <Text textAlign="center">
                  Se realizar o pedido de cancelamento do seu dependente, você
                  não será ressarcido pelos dias restantes e ele perderá o
                  acesso total ao clube.
                </Text>
              </AlertDialogBody>

              <AlertDialogFooter>
                <ActionButton
                  w="full"
                  onClick={() => {
                    handleDeleteDependent();
                    onClose();
                  }}
                >
                  Cancelar agora
                </ActionButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Container>
    </PageLayout>
  );
};

export default Dependents;
