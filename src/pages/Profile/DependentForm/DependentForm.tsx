import {
  Breadcrumb,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ActionButton from "../../../components/ActionButton/ActionButton";
import Actions from "../../../components/Actions/Actions";
import PageLayout from "../../../components/PageLayout/PageLayout";

interface DependentFormProps {
  editMode?: boolean;
  id?: string;
}

const DependentForm = ({ editMode = false }: DependentFormProps) => {
  return (
    <PageLayout>
      <Container maxW="container.md" pt={5} pb={20}>
        <Stack spacing={10} >
          <Breadcrumb
            items={[
              { route: "/", label: "Início" },
              { route: "/perfil", label: "Perfil" },
              { route: "/perfil/dependentes", label: "Dependentes" },
              {
                route: "/perfil/editar-dependente",
                label: "Editar Dependente",
              },
            ]}
          />

          <Flex justifyContent="center">
            <form id="dependent-form" style={{ paddingBottom: "1rem" }}>
              <Stack spacing={4}>
                <Heading size="md" fontWeight="500" color="primary">
                  {editMode
                    ? "Alterar dados do dependente"
                    : "Incluir novo familiar"}
                </Heading>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    Nome do dependente
                  </FormLabel>
                  <Input type="text" placeholder="" />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    CPF do dependente
                  </FormLabel>
                  <Input type="text" placeholder="" />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    E-mail do dependente
                  </FormLabel>
                  <Input type="text" placeholder="" />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    Tipo de dependente
                  </FormLabel>
                  <Select>
                    <option value=""></option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    Telefone
                  </FormLabel>
                  <Input type="text" placeholder="" />
                </FormControl>
                {editMode ? (
                  <></>
                ) : (
                  <Checkbox>
                    <small>
                      Declaro que as informações preenchidas acima são
                      verdadeiras e estou ciente de que o Iate Clube podera
                      verificar a veracidade das informações.
                    </small>
                  </Checkbox>
                )}
              </Stack>
            </form>
          </Flex>

          <Actions>
            <Link to="/perfil/dependentes">
              <ActionButton  variant="outline">
                Cancelar
              </ActionButton>
            </Link>
            <ActionButton type="submit" form="dependent-form">
              {editMode ? " Salvar alterações" : "Incluir dependente"}
            </ActionButton>
          </Actions>
        </Stack>
      </Container>
    </PageLayout>
  );
};

export default DependentForm;
