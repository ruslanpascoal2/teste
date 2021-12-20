import { ENDPOINTS } from "../constants/endpoints";
import useAxios from "../hooks/useAxios";
import { FacilityReserve } from "../models/facility-reserve.model";
import { Facility } from "../models/facility.model";

export function useFacilitiesService() {
  const axios = useAxios();

  const getFacilities = async (type: string, locationDate: string) => {
    const response = await axios.get<Facility[]>(ENDPOINTS.listFacilities(type, locationDate));
    return response.data;
  };

  const reserveFacility = async (reservation: FacilityReserve) => {
    const response = await axios.post<FacilityReserve>(ENDPOINTS.reserveFacility, reservation);
    return response.data;
  };

  const services = {
    getFacilities,
    reserveFacility
  };

  return services;
}
