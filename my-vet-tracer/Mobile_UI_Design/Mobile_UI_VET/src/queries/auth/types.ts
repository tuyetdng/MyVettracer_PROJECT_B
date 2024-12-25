import { LoginKey, OwnerUserKey } from "./keys";

export type Auth = {
  token: string;
};

export type LoginPayload = {
  [LoginKey.USERNAME]: string;
  [LoginKey.PASSWORD]: string;
};

export type OwnerPayload = {
  [OwnerUserKey.USERNAME]: string,
  [OwnerUserKey.IMG]: string,
  [OwnerUserKey.EMAIL]: string,
  [OwnerUserKey.PHONE_NUM]: string,
  [OwnerUserKey.PASSWORD]: string,
  [OwnerUserKey.FULL_NAME]: string,
  [OwnerUserKey.DOB]: string,
  [OwnerUserKey.GENDER]: string,
  [OwnerUserKey.NUM_OF_PET]: number,
};

export type RefreshTokenPayload = {
  token: string;
};
