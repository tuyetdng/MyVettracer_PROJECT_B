import { ApiResponseType, responseWrapper } from "../../queries/helpers";
import { API_QUERIES } from "../keys";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { OwnerUser } from "../../zustand/auth/types";
import { authApi } from ".";

export function useGetUserInfo(
  options?: UseQueryOptions<ApiResponseType<OwnerUser>, Error, OwnerUser>,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetUserInfo,
  } = useQuery<ApiResponseType<OwnerUser>, Error, OwnerUser>([API_QUERIES.USER], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<OwnerUser>>(authApi.getUserInfo);
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateUserInfo = () =>
    queryClient.invalidateQueries(API_QUERIES.USER);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetUserInfo,
    handleInvalidateUserInfo,
  };
}
