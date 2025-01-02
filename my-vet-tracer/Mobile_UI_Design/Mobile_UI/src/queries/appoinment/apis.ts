// import { VITE_BASE_URL } from "@env";
import { useHttpPrivateRequest } from "../../services/httpRequest/useHttpPrivateRequest";
import useHttpPublicRequest from "../../services/httpRequest/useHttpPublicRequest ";
import { ApiResponseType } from "../helpers";
import { AppointmentResponseType } from "./types";

const useApi = () => {
    const publicApi = useHttpPublicRequest("http://10.0.2.2:8080/myvettracer");
    const privateApi = useHttpPrivateRequest("http://10.0.2.2:8080/myvettracer");

    //Get appointment by pet
    const getAppointmentByPet = (idPet: number) => {
        return publicApi.get(`/appointment/pet-app/${idPet}`, {});
    };

    //Get is comfirm appointment by vet
    const getIsconfirmAppointmentByVet = (idVet: number) => {
        return publicApi.get(`/appointment/isconfirmed/${idVet}`, {});
    };

    //Get is comfirm appointment by vet
    const getNotconfirmAppointmentByVet = (idVet: number) => {
        return publicApi.get(`/appointment/notconfirmed/${idVet}`, {});
    };

    //Get is comfirm appointment by vet
    const confirmAppointment = (idAppointment: number): Promise<ApiResponseType<AppointmentResponseType>> => {
        return privateApi.patch(`/appointment/confirm/${idAppointment}`, {});
    }

    return {
        getAppointmentByPet,
        getIsconfirmAppointmentByVet,
        getNotconfirmAppointmentByVet,
        confirmAppointment,
    };
};

export default useApi;
