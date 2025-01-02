import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseListType, responseWrapper } from "../helpers";
import { AppointmentResponseType } from "./types";
import { API_QUERIES } from "../keys";
import { appoinmentApi } from ".";


export function useGetNotConfirmAppointmentByVet (
  idAppointment: number,
  options?: UseQueryOptions<AppointmentResponseType[], Error>,
) {
  const queryClient = useQueryClient();

  const { data, error, isError, isFetching, refetch } = useQuery<AppointmentResponseType[], Error>(
    [API_QUERIES.GETNOTCOMFIRMAPPOINTMENT, idAppointment],
    async () => {
      const response = await responseWrapper<ApiResponseListType<AppointmentResponseType>>(() =>
        appoinmentApi.getNotconfirmAppointmentByVet(idAppointment),
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

  const invalidateGetNotConfirmAppointmentByVet  = () =>
    queryClient.invalidateQueries([API_QUERIES.GETNOTCOMFIRMAPPOINTMENT, idAppointment]);

  return {
    data,
    error,
    isError,
    isFetching,
    refetch,
    invalidateGetNotConfirmAppointmentByVet ,
  };
}
