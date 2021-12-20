import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Heading, Stack, Text } from "@chakra-ui/layout";
import { HiOutlineMail } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormControl } from "@chakra-ui/form-control";
import { useMutation } from "react-query";
import { useLoginService } from "../../../services/login.service";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/react";
import Toast from "../../../components/Toast/Toast";

const ResetPasswordForm = () => {
  const toast = useToast();

  const showToast = (data: any, type: 'error' | 'success') => {
    toast({
      render: () => <Toast type={type} message={type === 'error' ? 'Email não encontrado.' : 'Uma nova senha foi enviada para seu email.'}/>,
      duration: 5000,
      isClosable: false,
    });
  };

  type FormData = {
    email: string;
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { resetPassword } = useLoginService();

  const resetPasswordMutation = useMutation(
    ({ email }: FormData) => resetPassword(email),
    {
      onSuccess: (res) => {
        showToast(res, 'success');
      },
      onError: (err) => {
        showToast(err, 'error');
      },
    }
  );

  const onSubmit = handleSubmit((data: FormData) => {
    resetPasswordMutation.mutate(data);
  });

  if (resetPasswordMutation.isLoading) {
    return (
      <Stack spacing={6} alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text>Processando...</Text>
      </Stack>
    );
  }

  return (
    <Stack spacing={4}>
      <Heading color="primary" as="h2" size="md" mb={2}>
        Redefinir senha
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack spacing={8}>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                style={{ height: 48 }}
                pointerEvents="none"
                children={<Icon as={HiOutlineMail} color="gray.400" />}
              />
              <Input
                size="lg"
                variant="default"
                placeholder="E-mail"
                type="email"
                autoComplete="nope"
                {...register("email")}
              />
            </InputGroup>
          </FormControl>
          <Button type="submit">Redefinir senha</Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default ResetPasswordForm;
