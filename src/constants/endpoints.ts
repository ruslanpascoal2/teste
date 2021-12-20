
export const ENDPOINTS = {
  login: "/login",
  ping: '/socios/',
  resetPassword: "/auth/forgot",
  changePassword: "/usuarios/updatePassword",

  listFacilities: (type: string, locationDate: string) => `/dependencias/?tipo=${type}&dataLocacao=${locationDate}`,
  reserveFacility: `/dependencias/reservas`,

  updateProfile: '/socios',
  getProfile:  `/socios/`

};
