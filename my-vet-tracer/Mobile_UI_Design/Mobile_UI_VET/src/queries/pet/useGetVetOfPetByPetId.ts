import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseType, responseWrapper } from "../helpers";
import { PetResponseType } from "./types";
import { API_QUERIES } from "../keys";
import { petApi } from ".";
import { VetResponseType } from "../vet/types";

export function useGetVetOfPetByPetId(
    pet_id: number,
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
    refetch: onGetVetOfPetByPetId,
  } = useQuery<
    ApiResponseType<VetResponseType>,
    Error,
    VetResponseType
  >([API_QUERIES.VETBYPET, pet_id], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<VetResponseType>>(() =>
        petApi.getVetOfPetByPetId(pet_id),
      );
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !!pet_id,
    keepPreviousData: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidategetVetOfPetByPetId = () =>
    queryClient.invalidateQueries([API_QUERIES.VETBYPET, pet_id]);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetVetOfPetByPetId,
    handleInvalidategetVetOfPetByPetId,
  };
}
