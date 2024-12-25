import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseListType, responseWrapper } from "../helpers";
import { AppointmentResponseType } from "./types";
import { API_QUERIES } from "../keys";
import { appoinmentApi } from ".";

/**
 * Hook to fetch appointments by a single pet ID.
 */
export function useGetAppointmentByPet(
  idPet: number,
  options?: UseQueryOptions<AppointmentResponseType[], Error>,
) {
  const queryClient = useQueryClient();

  const { data, error, isError, isFetching, refetch } = useQuery<AppointmentResponseType[], Error>(
    [API_QUERIES.APPOINTMENT, idPet],
    async () => {
      const response = await responseWrapper<ApiResponseListType<AppointmentResponseType>>(() =>
        appoinmentApi.getAppointmentByPet(idPet),
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

  const invalidateAppointmentByPet = () =>
    queryClient.invalidateQueries([API_QUERIES.APPOINTMENT, idPet]);

  return {
    data,
    error,
    isError,
    isFetching,
    refetch,
    invalidateAppointmentByPet,
  };
}

/**
 * Hook to fetch appointments for multiple pet IDs.
 */
export function useGetAppointmentsByPets(
  petIds: number[],
  options?: UseQueryOptions<AppointmentResponseType[], Error>,
) {
  const queryClient = useQueryClient();

  const { data, error, isError, isFetching, refetch } = useQuery<AppointmentResponseType[], Error>(
    [API_QUERIES.APPOINTMENT, ...petIds],
    async () => {
      const appointments = await Promise.all(
        petIds.map((idPet) =>
          responseWrapper<ApiResponseListType<AppointmentResponseType>>(() =>
            appoinmentApi.getAppointmentByPet(idPet),
          ).then((response) => response.result || []),
        ),
      );
      return appointments.flat();
    },
    {
      enabled: petIds.length > 0,
      select: (data) => data,
      notifyOnChangeProps: ["data", "isFetching"],
      keepPreviousData: true,
      ...options,
    },
  );

  const invalidateAppointmentsByPets = () =>
    queryClient.invalidateQueries([API_QUERIES.APPOINTMENT, ...petIds]);

  return {
    data,
    error,
    isError,
    isFetching,
    refetch,
    invalidateAppointmentsByPets,
  };
}
