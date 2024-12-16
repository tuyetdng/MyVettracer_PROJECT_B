export type OwnerUser = {
    idOwnerUser: number;
    userName: string;
    img: string;
    email: string;
    phoneNum: string;
    fullName: string;
    dob: string;
    gender: string;
    numOfPet: number;
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
