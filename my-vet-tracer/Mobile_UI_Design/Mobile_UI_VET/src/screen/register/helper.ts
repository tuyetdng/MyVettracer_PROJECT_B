import { LoginKey } from "../../queries/auth/keys";
import { LoginPayload, OwnerPayload } from "../../queries/auth/types";
import { z } from "zod";

export type LoginFormType = LoginPayload;
export const initialLoginFormValue: LoginFormType = {
  [LoginKey.USERNAME]: "",
  [LoginKey.PASSWORD]: "",
};

export const loginFormSchema = z.object({
  [LoginKey.USERNAME]: z.string().min(1, "Username is required"),
  [LoginKey.PASSWORD]: z.string().min(1, "Password is required"),
});


