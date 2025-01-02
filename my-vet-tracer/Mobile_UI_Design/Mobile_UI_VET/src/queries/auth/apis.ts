// import { VITE_BASE_URL } from "@env";
import { useHttpPrivateRequest } from "../../services/httpRequest/useHttpPrivateRequest";
import useHttpPublicRequest from "../../services/httpRequest/useHttpPublicRequest ";
import { LoginPayload, OwnerPayload } from "./types";

const useApi = () => {
  const publicApi = useHttpPublicRequest("http://10.0.2.2:8080/myvettracer");
  const privateApi = useHttpPrivateRequest("http://10.0.2.2:8080/myvettracer");


  //login method
  const authenticate = (payload: LoginPayload) => {
    return publicApi.post("/auth/token", payload);
  };

  //Get info login user
  const getUserInfo = () => {
    return privateApi.get("/owneruser/myinfo");
  };

  //refresh token
  const getRefreshToken = () => {
    return publicApi.post("/auth/refresh");
  };

  //register method
  const registerOwner = (payload: LoginPayload) => {
    return publicApi.post("/owneruser", payload);
  };
  const registerVet = (payload: LoginPayload) => {
    return publicApi.post("/vetuser", payload);
  };
  const viewOwnerProfileById = (owner_id: number) => {
    return privateApi.get(`/owneruser/viewOwner/${owner_id}`, {});
};
  return {
    authenticate,
    getUserInfo,
    getRefreshToken,
    registerOwner,
    registerVet,
    viewOwnerProfileById
  };
};

export default useApi;
