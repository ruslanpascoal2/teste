import styles from "./LoginForm.module.scss";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineIdcard } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { useLoginService } from "../../../services/login.service";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import Toast from "../../../components/Toast/Toast";
import { CAMPO_OBRIGATORIO } from "../../../common/feedbacks";
export default function LoginForm() {
  const auth = useAuth();

  type FormData = {
    memberId: string;
    password: string;
  };

  const schema = yup.object().shape({
    memberId: yup.string().required(CAMPO_OBRIGATORIO),
    password: yup.string().required(CAMPO_OBRIGATORIO).min(4, "A senha deve ter no mínimo 4 caracteres").max(32, "A senha deve ter no máximo 32 caracteres"),
  });

  const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { login } = useLoginService();

  const navigate = useNavigate();

  const toast = useToast();

  const showToast = (data: any, type: "error" | "success") => {
    console.log(data);
    
    toast({
      render: () => <Toast type={type} message={data.data.message} />,
      duration: 5000,
      isClosable: false,
    });
  };

  const loginMutation = useMutation(
    ({ memberId, password }: FormData) => login(memberId, password),
    {
      onSuccess: (res, data) => {
        if (res.headers.authorization) {
          let token = `${res.headers.authorization}`.slice(7);
          auth.signIn({ ...data, token }, () => {
            navigate("/", { replace: true });
          });
        }
      },
      onError: (err: any) => {
        showToast(err.response, "error");
      },
    }
  );

  const onSubmit = handleSubmit((data: FormData) => loginMutation.mutate(data));

  return (
    <div className={styles.loginForm}>
      {loginMutation.isLoading ? (
        <Stack spacing={6} alignItems="center">
          <Loading />
          <Text>Estamos autenticando seus dados...</Text>
        </Stack>
      ) : (
        <Stack spacing={4}>
          <Heading as="h2" size="md" mb={2}>
            Login
          </Heading>
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors?.memberId}>
                <InputGroup >
                  <InputLeftElement
                    style={{ height: 48 }}
                    pointerEvents="none"
                    children={<Icon as={AiOutlineIdcard} color="gray.400" />}
                  />
                  <Input
                    size="lg"
                    variant="default"
                    placeholder="Matrícula"
                    type="text"
                    autoComplete="nope"
                    {...register("memberId")}
                  />
                </InputGroup>
                <FormErrorMessage>{errors?.memberId?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.password}>
                <InputGroup>
                  <InputLeftElement
                    style={{ height: 48 }}
                    pointerEvents="none"
                    children={<Icon as={BiLockAlt} color="gray.400" />}
                  />
                  <Input
                    size="lg"
                    variant="default"
                    type="password"
                    placeholder="Senha"
                    {...register("password")}
                  />
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Button type="submit">Login</Button>
            </Stack>
          </form>
        </Stack>
      )}
    </div>
  );
}
