
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { PetResponseType } from "./types";
import { ApiResponseListType, responseWrapper } from "../helpers";
import { API_QUERIES } from "../keys";
import { petApi } from ".";

export function useGetPetsByVetID(
  vet_id: number,
  options?: UseQueryOptions<
    ApiResponseListType<PetResponseType>,
    Error,
    PetResponseType[]
  >,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetListPetByVet,
  } = useQuery<
    ApiResponseListType<PetResponseType>,
    Error,
    PetResponseType[]
  >([API_QUERIES.PETBYVET, vet_id], {
    queryFn: () => {
      return responseWrapper<ApiResponseListType<PetResponseType>>(() =>
        petApi.getPetOfVetByVetId(vet_id),
      );
    },

    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateListPetByVet = () =>
    queryClient.invalidateQueries(API_QUERIES.PETBYVET);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetListPet: onGetListPetByVet,
    handleInvalidateListPetByVet,
  };
}
