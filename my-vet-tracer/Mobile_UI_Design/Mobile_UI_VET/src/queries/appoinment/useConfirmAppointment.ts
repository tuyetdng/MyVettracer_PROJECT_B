import { useMutation, UseMutationOptions } from "react-query";
import { ApiResponseType, responseWrapper } from "../helpers";
import { AppointmentResponseType } from "./types";
import { API_QUERIES } from "../keys";
import { appoinmentApi } from ".";

export function useConfirmAppointment(
  options?: UseMutationOptions<ApiResponseType<AppointmentResponseType>, Error, number>,
) {
  const {
    mutate: onConfirmAppointment,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<AppointmentResponseType>, Error, number>(
    [API_QUERIES.COMFIRMAPPOINTMENT],
    async (idAppointment) => {
      const response = await responseWrapper<ApiResponseType<AppointmentResponseType>>(() =>
        appoinmentApi.confirmAppointment(idAppointment),
      );
      return response;
    },
    options
  );

  return {
    onConfirmAppointment,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
