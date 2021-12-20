import { ENDPOINTS } from "../constants/endpoints";
import useAxios from "../hooks/useAxios";
import { ChangePassword, Profile } from "../models/profile.model";

export function useProfileService() {
  const axios = useAxios();

  const getProfile = async () => {
    let response = await axios.get(ENDPOINTS.getProfile);
    return response.data;
  };

  const updateProfile = async (profile: Profile) => {
    return await axios.post(ENDPOINTS.updateProfile, profile);
  };

  const changePassword = async (body: ChangePassword) => {
    return await axios.put(ENDPOINTS.changePassword, body);
  };

  const services = {
    getProfile,
    updateProfile,
    changePassword
  };

  return services;
}
