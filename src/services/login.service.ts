import { ENDPOINTS } from "../constants/endpoints";
import useAxios from "../hooks/useAxios";

export function useLoginService() {
  const axios = useAxios();

  const login = async (memberId: string, password: string) => {
    return await axios.post(ENDPOINTS.login, { carteira: memberId, senha: password });
  };

  const resetPassword = async (email: string) => {
    return await axios.post(ENDPOINTS.resetPassword, {email});
  };

  const services = {
    login,
    resetPassword
  };

  return services;
}
