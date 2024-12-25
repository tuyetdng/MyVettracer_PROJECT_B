import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseType, responseWrapper } from "../helpers";
import { API_QUERIES } from "../keys";
import { VetResponseType } from "./types";
import { vetApi } from ".";

export function useGetVetById(
    vet_id: number,
  options?: UseQueryOptions<
    ApiResponseType<VetResponseType>,
    Error,
    VetResponseType
  >,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetVetById,
  } = useQuery<
    ApiResponseType<VetResponseType>,
    Error,
    VetResponseType
  >([API_QUERIES.OWNERGETVET, vet_id], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<VetResponseType>>(() =>
        vetApi.getVetById(vet_id),
      );
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !!vet_id,
    keepPreviousData: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateVetById = () =>
    queryClient.invalidateQueries([API_QUERIES.OWNERGETVET, vet_id]);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetVetById,
    handleInvalidateVetById,
  };
}
