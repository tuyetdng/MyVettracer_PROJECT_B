import { LoginKey } from "./keys";

export type Auth = {
  token: string;
};

export type LoginPayload = {
  [LoginKey.USERNAME]: string;
  [LoginKey.PASSWORD]: string;
};

export type RefreshTokenPayload = {
  token: string;
};
