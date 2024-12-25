import { ApiResponseType, responseWrapper } from '../helpers';
import { useMutation, UseMutationOptions } from "react-query";
import { authApi } from ".";
import { Auth, LoginPayload } from "./types";

export function useVetRegister(
  options?: UseMutationOptions<ApiResponseType<Auth>, Error, LoginPayload>,
) {
  const {
    mutate: onRegisterVetUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<Auth>, Error, LoginPayload>({
    mutationFn: (payload: LoginPayload) =>
      responseWrapper(authApi.registerVet, [payload]),
    ...options,
  });

  return {
    onRegisterVetUser,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
