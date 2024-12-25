
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { PetResponseType } from "./types";
import { ApiResponseListType, responseWrapper } from "../helpers";
import { API_QUERIES } from "../keys";
import { petApi } from ".";

export function useGetListPets(
    user_id: number,
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
    refetch: onGetListPet,
  } = useQuery<
    ApiResponseListType<PetResponseType>,
    Error,
    PetResponseType[]
  >([API_QUERIES.PET, user_id], {
    queryFn: () => {
      return responseWrapper<ApiResponseListType<PetResponseType>>(() =>
        petApi.getPetsOfOwnerUser(user_id),
      );
    },

    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateListPet = () =>
    queryClient.invalidateQueries(API_QUERIES.PET);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetUseronGetListPetInfo: onGetListPet,
    handleInvalidateListPet: handleInvalidateListPet,
  };
}
