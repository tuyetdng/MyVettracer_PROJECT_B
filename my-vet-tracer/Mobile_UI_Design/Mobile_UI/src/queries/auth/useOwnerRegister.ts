import {ApiResponseType, responseWrapper } from '../helpers';
import { useMutation, UseMutationOptions }  from "react-query";
import { authApi } from ".";
import { Auth, LoginPayload } from "./types";

export function useOwnerRegister(
  options?: UseMutationOptions<ApiResponseType<Auth>, Error, LoginPayload>,
) {
  const {
    mutate: onRegisterOwnerUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<Auth>, Error, LoginPayload>({
    mutationFn: (payload: LoginPayload) =>
      responseWrapper(authApi.registerOwner, [payload]),
    ...options,
  });

  return {
    onRegisterOwnerUser,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
