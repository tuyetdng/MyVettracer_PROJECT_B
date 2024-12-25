
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { VetResponseType } from "./types";
import { ApiResponseListType, responseWrapper } from "../helpers";
import { API_QUERIES } from "../keys";
import { vetApi } from ".";

export function useGetListVet(
  options?: UseQueryOptions<
    ApiResponseListType<VetResponseType>,
    Error,
    VetResponseType[]
  >,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetListVetUser,
  } = useQuery<
    ApiResponseListType<VetResponseType>,
    Error,
    VetResponseType[]
  >([API_QUERIES.OWNERGETVET], {
    queryFn: () => {
      return responseWrapper<ApiResponseListType<VetResponseType>>(
        vetApi.getListVet,
      );
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateListVet = () =>
    queryClient.invalidateQueries(API_QUERIES.OWNERGETVET);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetListVetUser,
    handleInvalidateListVet,
  };
}
