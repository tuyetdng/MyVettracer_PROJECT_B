package com.tuyetdang.my_vet_tracer.constant;

public class PathConstant {
    public static final String API_BASE = "/myvettracer";

    public static final String OWNER_USER = "/owneruser";
    public static final String VET_USER = "/vetuser";
    public static final String PET = "/pet";
    public static final String APPOINTMENT = "/appointment";
    public static final String MEDICINE = "/medicine";
    public static final String VACCINE = "/vaccine";
    public static final String AUTH = "/auth";

//    public static final String API_OWNER_USER = API_BASE + OWNER_USER;
//    public static final String API_VET_USER = API_BASE + VET_USER;
//    public static final String API_PET = API_BASE + PET;
//    public static final String API_APPOINTMENT = API_BASE + APPOINTMENT;
//    public static final String API_MEDICINE = API_BASE + MEDICINE;
//    public static final String API_VACCINE = API_BASE + VACCINE;
//    public static final String API_AUTH = API_BASE + AUTH;

    public static final String API_OWNER_USER =  OWNER_USER;
    public static final String API_VET_USER = VET_USER;
    public static final String API_PET =  PET;
    public static final String API_APPOINTMENT =  APPOINTMENT;
    public static final String API_MEDICINE =  MEDICINE;
    public static final String API_VACCINE =  VACCINE;
    public static final String API_AUTH =  AUTH;

    public static final String[] PUBLIC_AUTH_ENDPOINTS = {
            API_AUTH + "/token",
            API_AUTH + "/introspect"
    };

    public static  final String[] PRIVATE_AUTH_ENDPOINTS = {
            API_OWNER_USER + "/getownerusers",
            API_OWNER_USER + "/getownerusers/{user_id}",
            API_VET_USER + "/getvetusers",
            API_VET_USER + "/getvetusers/{user_id}",
    };
    public static final String[] PUBLIC_GET_ENDPOINTS = {
//            API_OWNER_USER + "/getownerusers",
//            API_OWNER_USER + "/getownerusers/{user_id}",
//            API_VET_USER + "/getvetusers",
//            API_VET_USER + "/getvetusers/{user_id}",
            API_PET + "/getpets",
            API_PET + "/getpets/{pet_id}",
            API_APPOINTMENT + "/getappointments",
            API_APPOINTMENT + "/getappointments/{app_id}",
            API_MEDICINE + "/getmedicines",
            API_MEDICINE + "/getmedicines/{mec_id}",
            API_VACCINE + "/getvaccines",
            API_VACCINE + "/getvaccines/{vac_id}"
    };

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            API_OWNER_USER + "/addowneruser",
            API_VET_USER + "/addvetuser",
            API_PET + "/addpet",
            API_APPOINTMENT + "/addappointment",
            API_MEDICINE + "/addmedicine",
            API_VACCINE + "/addvaccine"
    };

    // Secured Endpoints
    public static final String[] SECURED_PUT_ENDPOINTS = {
            API_OWNER_USER + "/updateowneruser/{user_id}",
            API_VET_USER + "/updatevetuser/{user_id}",
            API_PET + "/updatepet/{pet_id}",
            API_APPOINTMENT + "/updateappointment/{app_id}",
            API_MEDICINE + "/updatemedicine/{mec_id}",
            API_VACCINE + "/updatevaccine/{vac_id}"
    };

    public static final String[] SECURED_DELETE_ENDPOINTS = {
            API_OWNER_USER + "/deleteowneruser/{user_id}",
            API_VET_USER + "/deletevetuser/{user_id}",
            API_PET + "/deletepet/{pet_id}",
            API_APPOINTMENT + "/deleteappointment/{app_id}",
            API_MEDICINE + "/deletemedicine/{mec_id}",
            API_VACCINE + "/deletevaccine/{vac_id}"
    };

//    // Swagger & Other Public Utilities
//    public static final String[] SWAGGER_ENDPOINTS = {
//            "/swagger-ui/**",
//            "/v3/api-docs/**"
//    };

    // Combine Public Endpoints
//    public static final String[] PUBLIC_ENDPOINTS = concatArrays(PUBLIC_AUTH_ENDPOINTS, PUBLIC_GET_ENDPOINTS, PUBLIC_POST_ENDPOINTS, SWAGGER_ENDPOINTS);
//
//    // Utility to combine arrays
//    private static String[] concatArrays(String[]... arrays) {
//        return java.util.Arrays.stream(arrays).flatMap(java.util.Arrays::stream).toArray(String[]::new);
//    }
}
