import {ApiResponseType, responseWrapper } from '../helpers';
import { useMutation, UseMutationOptions }  from "react-query";
import { authApi } from ".";
import { Auth, LoginPayload } from "./types";

export function useLogin(
  options?: UseMutationOptions<ApiResponseType<Auth>, Error, LoginPayload>,
) {
  const {
    mutate: onLogin,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<Auth>, Error, LoginPayload>({
    mutationFn: (payload: LoginPayload) =>
      responseWrapper(authApi.authenticate, [payload]),
    ...options,
  });

  return {
    onLogin,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
