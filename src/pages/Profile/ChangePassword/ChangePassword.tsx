import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import PageLayout from "../../../components/PageLayout/PageLayout";
import styles from "./ChangePassword.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Actions from "../../../components/Actions/Actions";
import ActionButton from "../../../components/ActionButton/ActionButton";
import { useProfileService } from "../../../services/profile.service";
import { useMutation, useQuery } from "react-query";
import Toast from "../../../components/Toast/Toast";
import Loading from "../../../components/Loading/Loading";

type FormData = {
  senhaAntig: string;
  senhaNova: string;
  confirSenha: string;
};

const ChangePassword = () => {
  const schema = yup
    .object({
      senhaAntig: yup.string().required("Campo obrigatório"),
      senhaNova: yup.string().required("Campo obrigatório"),
      confirSenha: yup
        .string()
        .oneOf([yup.ref("senhaNova"), null], "As senhas não conferem."),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  const toast = useToast();

  const showToast = (data: any, type: "error" | "success") => {
    toast({
      render: () => <Toast type={type} message={type === 'error' ? 'Não foi possível alterar a senha.' : data} />,
      duration: 8000,
      isClosable: false,
    });
  };

  const { getProfile, changePassword } = useProfileService();

  const { data: profile, isLoading } = useQuery("getProfile", getProfile, {
    refetchOnWindowFocus: false,
  });
  
  const mutation = useMutation(
    (formData: FormData) => changePassword({ ...formData, idenUsu: profile.iden }),
    {
      onSuccess: () => {
        showToast("Senha alterada com sucesso.", "success");
        reset()
      },
      onError: (err: any) => {
        showToast(err.response, "error");
      },
    }
  );

  return (
    <PageLayout>
      <Container maxW="container.md" pt={5} pb={20}>
        <Stack spacing={10} className={styles.profileForm}>
          <Breadcrumb
            items={[
              { route: "/", label: "Início" },
              { route: "/perfil", label: "Perfil" },
              { route: "/perfil/alterar-senha", label: "Alterar Senha" },
            ]}
          />
          {isLoading  ? (
            <Box pt={'200px'} alignSelf={"center"}><Loading blockUi/></Box>
          ) : (
            <>
              <Box alignSelf={"center"} w={["100%", "100%", "50%"]}>
                <form
                  id="change-password-form"
                  className={styles.form}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Stack spacing={4}>
                    <Heading size="md" fontWeight="500" color="primary">
                      Alterar senha
                    </Heading>
                    <FormControl>
                      <FormLabel fontWeight="400" color="gray.500">
                        Senha atual
                      </FormLabel>
                      <Input
                        type="password"
                        placeholder=""
                        {...register("senhaAntig")}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="400" color="gray.500">
                        Nova senha
                      </FormLabel>
                      <Input
                        type="password"
                        placeholder=""
                        {...register("senhaNova")}
                      />
                    </FormControl>
                    <FormControl isInvalid={errors?.confirmNewPassword}>
                      <FormLabel fontWeight="400" color="gray.500">
                        Confirmar nova senha
                      </FormLabel>
                      <Input
                        type="password"
                        placeholder=""
                        errorBorderColor="red"
                        {...register("confirSenha")}
                      />
                      <FormErrorMessage>
                        {errors?.confirmNewPassword?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                </form>
              </Box>

              <Actions justify={"center"}>
                <Link to="/perfil">
                  <ActionButton variant="outline" type="button">
                    Cancelar
                  </ActionButton>
                </Link>
                <ActionButton type="submit" form="change-password-form"  isLoading={mutation.isLoading}>
                  Salvar alterações
                </ActionButton>
              </Actions>
            </>
          )}
        </Stack>
      </Container>
    </PageLayout>
  );
};

export default ChangePassword;
