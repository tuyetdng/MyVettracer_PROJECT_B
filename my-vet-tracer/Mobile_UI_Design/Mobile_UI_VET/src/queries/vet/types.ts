export interface VetResponseType {
    idVetUser: number;
    userName: string;
    img: string,
    email: string;
    phoneNum: string;
    fullName: string;
    dob: string; 
    gender: string;
    nameOfConsultingRoom: string;
    clinicAddress: string;
    qualification: string;
    experience: string;
    authentication: number; //  1 || 0
    roles: Role[];
};

export type Role = {
    name: string;
    description: string;
    permissions: Permission[];
};

export type Permission = {
    name: string;
    description: string
}

