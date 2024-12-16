import { VITE_BASE_URL } from "@env";
import { useHttpPrivateRequest } from "../../services/httpRequest/useHttpPrivateRequest";
import useHttpPublicRequest from "../../services/httpRequest/useHttpPublicRequest ";
import { LoginPayload } from "./types";

const useApi = (baseURL = VITE_BASE_URL) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);


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

  return {
    authenticate,
    getUserInfo,
    getRefreshToken,
  };
};

export default useApi;
