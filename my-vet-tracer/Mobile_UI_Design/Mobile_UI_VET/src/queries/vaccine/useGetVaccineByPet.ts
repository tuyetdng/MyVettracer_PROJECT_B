import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseListType, responseWrapper } from "../helpers";
import { API_QUERIES } from "../keys";
import { VaccineResponseType } from "./types";
import { vaccineApi } from ".";



/**
 * Hook to fetch vaccine by a single pet ID.
 */
export function useGetVaccineByPet(
  idPet: number,
  options?: UseQueryOptions<
    VaccineResponseType[],
    Error
  >,
) {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isError,
    isFetching,
    refetch
  } = useQuery<VaccineResponseType[], Error>(
    [API_QUERIES.VACCINE, idPet],
    async () => {
      const response = await responseWrapper<ApiResponseListType<VaccineResponseType>>(() =>
        vaccineApi.getVaccineByPet(idPet),
      );
      return response.result || [];
    },
    {
      select: (data) => data,
      notifyOnChangeProps: ["data", "isFetching"],
      keepPreviousData: true,
      ...options,
    },
  );

  const invalidateVaccineByPet = () =>
    queryClient.invalidateQueries([API_QUERIES.VACCINE, idPet]);

  return {
    data,
    error,
    isError,
    isFetching,
    refetch,
    invalidateVaccineByPet,
  };
}

/**
 * Hook to fetch Vaccines for multiple pet IDs.
 */
export function useGetVaccinesByPets(
  petIds: number[],
  options?: UseQueryOptions<
    VaccineResponseType[],
    Error
  >,
) {
  const queryClient = useQueryClient();

  const { data, error, isError, isFetching, refetch } = useQuery<VaccineResponseType[], Error>(
    [API_QUERIES.VACCINE, ...petIds],
    async () => {
      const Vaccines = await Promise.all(
        petIds.map((idPet) =>
          responseWrapper<ApiResponseListType<VaccineResponseType>>(() =>
            vaccineApi.getVaccineByPet(idPet),
          ).then((response) => response.result || []),
        ),
      );
      return Vaccines.flat();
    },
    {
      enabled: petIds.length > 0,
      select: (data) => data,
      notifyOnChangeProps: ["data", "isFetching"],
      keepPreviousData: true,
      ...options,
    },
  );

  const invalidateVaccinesByPets = () =>
    queryClient.invalidateQueries([API_QUERIES.VACCINE, ...petIds]);

  return {
    data,
    error,
    isError,
    isFetching,
    refetch,
    invalidateVaccinesByPets,
  };
}
