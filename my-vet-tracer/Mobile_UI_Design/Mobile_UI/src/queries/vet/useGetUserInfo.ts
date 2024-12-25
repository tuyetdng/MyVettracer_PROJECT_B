import { ApiResponseType, responseWrapper } from "../../queries/helpers";
import { API_QUERIES } from "../keys";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";

import { VetResponseType } from "./types";
import { vetApi } from ".";

export function useGetVetUserInfo(
  options?: UseQueryOptions<ApiResponseType<VetResponseType>, Error, VetResponseType>,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetVetUserInfo,
  } = useQuery<ApiResponseType<VetResponseType>, Error, VetResponseType>([API_QUERIES.VET], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<VetResponseType>>(vetApi.getUserInfo);
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateVetUserInfo = () =>
    queryClient.invalidateQueries(API_QUERIES.VET);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetVetUserInfo,
    handleInvalidateVetUserInfo,
  };
}
