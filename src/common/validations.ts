export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const CPF_REGEX = /(\d{3})(\d{3})(\d{3})(\d{2})/;
export const CNPJ_REGEX = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/gim;
export const NOT_NUMBERS_REGEX = /^[^0-9]+$/;
export const ONLY_NUMBERS_REGEX = /[^\d]/gi;
