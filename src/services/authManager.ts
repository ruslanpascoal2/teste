const AUTH_MANAGER_KEYS = {
    TOKEN: 'token',
  };
  
  export const authManager = {
    set: async (token: string) => {
      try {
        await localStorage.setItem(AUTH_MANAGER_KEYS.TOKEN, token);
        return true;
      } catch {
        return false;
      }
    },
  
    get: () => localStorage.getItem(AUTH_MANAGER_KEYS.TOKEN),
  
    clear: async () => {
      await localStorage.removeItem(AUTH_MANAGER_KEYS.TOKEN);
    },
  };
  