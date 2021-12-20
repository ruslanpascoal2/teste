import styles from "./Login.module.scss";

import LoginForm from "./LoginForm/LoginForm";
import ResetPassword from "./ResetPasswordForm/ResetPasswordForm";

import { Container, HStack, Link, Stack, Text, Box } from "@chakra-ui/layout";
import { useState } from "react";

import { Image, useBreakpointValue } from "@chakra-ui/react";

import logo from "../../assets/img/logo/logo_iate_versao_12_azul.jpg";

const Login = () => {
  const [resetPassword, setResetPassword] = useState<boolean>(false);

  const handleResetPassword = () => {
    setResetPassword((old) => !old);
  };

  const logoPaddingBottom = useBreakpointValue({base: '4rem', md: '200px'})
  const logoHeight = useBreakpointValue({base: '120px', md: '200px'})

  return (
    <Stack className={styles.container}>
      <Box style={{paddingBottom: logoPaddingBottom}}>
        <Image src={logo} height={logoHeight} alt="Iate Clube de Brasília"></Image>
      </Box>
      <Container>
        {resetPassword ? (
          <Stack justifyContent="center" alignItems="center" spacing={6}>
            <ResetPassword />
            <Link color="blue.400" onClick={handleResetPassword}>
              Voltar
            </Link>
          </Stack>
        ) : (
          <Stack justifyContent="center" alignItems="center" spacing={6}>
            <LoginForm />
            <HStack marginTop={5}>
              <Text color="primary">Esqueceu a senha?</Text>
              <Link color="blue.400" onClick={handleResetPassword}>
                Clique aqui
              </Link>
            </HStack>
          </Stack>
        )}
      </Container>
    </Stack>
  );
};

export default Login;
